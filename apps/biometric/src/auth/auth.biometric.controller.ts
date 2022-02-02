import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";

import { IJwt } from "../common/jwt";
import { Public, User } from "../common/decorators";
import { UserEntity } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { BiometricGuard } from "../common/guards";
import { JwtLogoutDto, JwtRefreshTokenDto } from "./dto";
import { UserCreateDto } from "../user/dto";
import { UserService } from "../user/user.service";

@Public()
@Controller("/auth")
export class AuthBiometricController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
        },
        signature: {
          type: "string",
        },
      },
    },
  })
  @HttpCode(200)
  @Post("/biometric")
  @UseGuards(BiometricGuard)
  public biometric(@User() userEntity: UserEntity): Promise<IJwt> {
    return this.authService.loginUser(userEntity);
  }

  @Post("/refresh")
  @HttpCode(200)
  async refreshToken(@Body() dto: JwtRefreshTokenDto): Promise<IJwt> {
    return this.authService.refresh(dto);
  }

  @Post("/logout")
  @HttpCode(204)
  public async logout(@Body() dto: JwtLogoutDto): Promise<void> {
    await this.authService.delete(dto);
  }

  @Get("signup")
  public async signup(@Body() dto: UserCreateDto): Promise<IJwt> {
    const userEntity = await this.userService.create(dto);
    return this.authService.loginUser(userEntity);
  }
}
