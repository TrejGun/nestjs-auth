import {Body, Controller, Get, Post} from "@nestjs/common";

import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {IJwt} from "./interfaces";
import {Public} from "../common/decorators";
import {JwtLogoutSchema, JwtRefreshTokenSchema, LoginSchema} from "./schemas";
import {UserCreateSchema} from "../user/schemas";

@Controller("/auth")
export class AuthJwtController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Public()
  @Post("login")
  public login(@Body() data: LoginSchema): Promise<IJwt> {
    return this.authService.login(data);
  }

  @Public()
  @Post("refresh")
  async refreshToken(@Body() data: JwtRefreshTokenSchema): Promise<IJwt> {
    return this.authService.refresh(data);
  }

  @Public()
  @Get("logout")
  public async logout(@Body() data: JwtLogoutSchema): Promise<boolean> {
    await this.authService.delete(data);
    return true;
  }

  @Public()
  @Get("signup")
  public async signup(@Body() data: UserCreateSchema): Promise<IJwt> {
    const userEntity = await this.userService.create(data);
    return this.authService.loginUser(userEntity);
  }
}
