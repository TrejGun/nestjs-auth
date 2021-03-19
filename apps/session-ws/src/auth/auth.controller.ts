import {Request, Response} from "express";
import {Body, Controller, Get, Post, Req, Res, HttpCode, UseGuards} from "@nestjs/common";
import {promisify} from "util";

import {Public, User} from "../common/decorators";
import {LoginGuard} from "../common/guards";
import {UserEntity} from "../user/user.entity";
import {UserService} from "../user/user.service";
import {UserCreateSchema} from "../user/schemas";

@Public()
@Controller("/auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

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
    // @ts-ignore
    req.session.destroy();
    req.logout();
    res.clearCookie("nest");
    res.send("");
  }

  @Get("/signup")
  public async signup(@Body() data: UserCreateSchema, @Req() req: Request): Promise<UserEntity> {
    const userEntity = await this.userService.create(data);
    await promisify(req.logIn.bind(req))(userEntity);
    return userEntity;
  }
}
