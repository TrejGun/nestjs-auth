import { Body, Controller, Get, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { IJwt } from "../common/jwt";
import { Public } from "../common/decorators";
import { JwtLogoutDto, JwtRefreshTokenDto, LoginDto } from "./dto";
import { UserCreateDto } from "../user/dto";

@Public()
@Controller("/auth")
export class AuthJwtController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post("login")
  public login(@Body() dto: LoginDto): Promise<IJwt> {
    return this.authService.login(dto);
  }

  @Post("refresh")
  async refreshToken(@Body() dto: JwtRefreshTokenDto): Promise<IJwt> {
    return this.authService.refresh(dto);
  }

  @Get("logout")
  public async logout(@Body() dto: JwtLogoutDto): Promise<boolean> {
    await this.authService.delete(dto);
    return true;
  }

  @Get("signup")
  public async signup(@Body() dto: UserCreateDto): Promise<IJwt> {
    const userEntity = await this.userService.create(dto);
    return this.authService.loginUser(userEntity);
  }
}
