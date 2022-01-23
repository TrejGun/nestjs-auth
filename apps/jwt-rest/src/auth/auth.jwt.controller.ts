import { Body, Controller, Get, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { IJwt } from "../common/jwt";
import { Public } from "../common/decorators";
import { JwtLogoutDto, JwtRefreshTokenDto, LoginDto } from "./dto";
import { UserCreateDto } from "../user/dto";

@Controller("/auth")
export class AuthJwtController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Public()
  @Post("login")
  public login(@Body() dto: LoginDto): Promise<IJwt> {
    return this.authService.login(dto);
  }

  @Public()
  @Post("refresh")
  async refreshToken(@Body() dto: JwtRefreshTokenDto): Promise<IJwt> {
    return this.authService.refresh(dto);
  }

  @Public()
  @Get("logout")
  public async logout(@Body() dto: JwtLogoutDto): Promise<boolean> {
    await this.authService.delete(dto);
    return true;
  }

  @Public()
  @Get("signup")
  public async signup(@Body() dto: UserCreateDto): Promise<IJwt> {
    const userEntity = await this.userService.create(dto);
    return this.authService.loginUser(userEntity);
  }
}
