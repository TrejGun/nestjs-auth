import { Request, Response } from "express";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { promisify } from "util";

import { Public, User } from "../common/decorators";
import { LoginGuard } from "../common/guards";
import { UserEntity } from "../user/user.entity";
import { UserCreateDto } from "../user/dto";
import { AuthService } from "./auth.service";

@Public()
@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/login")
  public main(@User() userEntity: UserEntity): string {
    return `
      <html>
         <script>
					function handleclick(el) {
            window.open(el.href, '_blank', 'height=600,width=800,top=0,left=0');
            return false
					}
				</script>
        <body>
          <p>logged in as ${JSON.stringify(userEntity)}</p>
          <form action="/auth/login" method="post">
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="submit" />
          </form>
        </body>
      </html>
    `;
  }

  @UseGuards(LoginGuard)
  @Post("/login")
  public login(@User() user: UserEntity): UserEntity {
    return user;
  }

  @HttpCode(204)
  @Get("/logout")
  public logout(@Req() req: Request, @Res() res: Response): void {
    this.authService.logout(req, res);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/signup")
  public async signup(@Body() dto: UserCreateDto, @Req() req: Request): Promise<UserEntity> {
    const userEntity = await this.authService.signup(dto);
    await promisify(req.logIn.bind(req))(userEntity);
    return userEntity;
  }
}
