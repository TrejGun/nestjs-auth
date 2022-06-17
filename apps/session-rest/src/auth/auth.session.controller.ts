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
import { ApiBody } from "@nestjs/swagger";
import { promisify } from "util";

import { Public, User } from "../common/decorators";
import { LoginGuard } from "../common/guards";
import { UserEntity } from "../user/user.entity";
import { UserCreateDto } from "../user/dto";
import { AuthService } from "./auth.service";

@Public()
@Controller("/auth")
export class AuthSessionController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
  })
  @UseInterceptors(ClassSerializerInterceptor)
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
  public async signup(@Body() data: UserCreateDto, @Req() req: Request): Promise<UserEntity> {
    const userEntity = await this.authService.signup(data);
    await promisify(req.logIn.bind(req))(userEntity);
    return userEntity;
  }
}
