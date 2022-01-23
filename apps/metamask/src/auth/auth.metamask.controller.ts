import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";

import { IJwt } from "../common/jwt";
import { Public, User } from "../common/decorators";
import { UserEntity } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { MetamaskGuard } from "../common/guards";
import { JwtLogoutDto, JwtRefreshTokenDto } from "./dto";

@Public()
@Controller("/auth")
export class AuthMetamaskController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: "object",
      properties: {
        nonce: {
          type: "string",
        },
        signature: {
          type: "string",
        },
        wallet: {
          type: "string",
        },
      },
    },
  })
  @UseGuards(MetamaskGuard)
  @HttpCode(200)
  @Post("/login")
  public login(@User() userEntity: UserEntity): Promise<IJwt> {
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
}
