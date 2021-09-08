import { Request, Response } from "express";
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpCode,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { promisify } from "util";

import { Public, User } from "../common/decorators";
import { LoginGuard, FacebookGuard, GoogleGuard, BiometricGuard } from "../common/guards";
import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { UserCreateDto } from "../user/dto";

@Public()
@Controller("/auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LoginGuard)
  @Post("/login")
  public login(@User() user: UserEntity): UserEntity {
    return user;
  }

  @HttpCode(204)
  @Get("/logout")
  public logout(@Req() req: Request, @Res() res: Response): void {
    // @ts-ignore
    req.session.destroy();
    req.logout();
    res.clearCookie("nest");
    res.send("");
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/signup")
  public async signup(@Body() data: UserCreateDto, @Req() req: Request): Promise<UserEntity> {
    const userEntity = await this.userService.create(data);
    // @ts-ignore
    await promisify(req.logIn.bind(req))(userEntity);
    return userEntity;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(BiometricGuard)
  @HttpCode(200)
  @Post("/biometric")
  public biometric(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Get("/google")
  @UseGuards(GoogleGuard)
  public googleLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Get("/google/callback")
  @UseGuards(GoogleGuard)
  public googleLoginCallback(@User() userEntity: UserEntity): string {
    return `
      <html>
      	<script>
					function handleLoad() {
					  alert('${JSON.stringify(userEntity)}');
						window.close();
					}
				</script>
        <body onload="handleLoad()" />
      </html>
    `;
  }

  @Get("/facebook")
  @UseGuards(FacebookGuard)
  public facebookLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Get("/facebook/callback")
  @UseGuards(FacebookGuard)
  public facebookLoginCallback(@User() userEntity: UserEntity): string {
    return `
      <html>
      	<script>
					function handleLoad() {
					  alert('${JSON.stringify(userEntity)}');
						window.close();
					}
				</script>
        <body onload="handleLoad()" />
      </html>
    `;
  }
}
