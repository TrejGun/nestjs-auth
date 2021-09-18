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
import { BiometricGuard, LoginGuard } from "../common/guards";
import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { UserCreateDto } from "../user/dto";

@Public()
@Controller("/auth")
export class AuthSessionController {
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
}
