import { Body, Controller, Get, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { IJwt } from "./interfaces";
import { Public } from "../common/decorators";
import { JwtLogoutDto, JwtRefreshTokenDto, LoginDto } from "./dto";
import { UserCreateDto } from "../user/dto";

@Controller("/auth")
export class AuthJwtController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Public()
  @Post("login")
  public login(@Body() data: LoginDto): Promise<IJwt> {
    return this.authService.login(data);
  }

  @Public()
  @Post("refresh")
  async refreshToken(@Body() data: JwtRefreshTokenDto): Promise<IJwt> {
    return this.authService.refresh(data);
  }

  @Public()
  @Get("logout")
  public async logout(@Body() data: JwtLogoutDto): Promise<boolean> {
    await this.authService.delete(data);
    return true;
  }

  @Public()
  @Get("signup")
  public async signup(@Body() data: UserCreateDto): Promise<IJwt> {
    const userEntity = await this.userService.create(data);
    return this.authService.loginUser(userEntity);
  }
}
