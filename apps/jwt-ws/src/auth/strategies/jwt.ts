import { ExtractJwt, Strategy, JwtFromRequestFunction } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Request } from "express";

import { UserService } from "../../user/user.service";
import { UserEntity } from "../../user/user.entity";

const ExtractJwtFromSocketIoHandshake: JwtFromRequestFunction = (req: Request) => {
  // @ts-ignore
  return ExtractJwt.fromAuthHeaderWithScheme("bearer")(req.handshake);
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwtFromSocketIoHandshake,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  public async validate(payload: { email: string }): Promise<UserEntity> {
    const userEntity = await this.userService.findOne({ email: payload.email });

    if (!userEntity) {
      throw new WsException("unauthorized");
    }

    return userEntity;
  }
}
