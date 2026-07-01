import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";
import { ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { Strategy } from "passport-firebase-jwt";
import { Request } from "express";
import { Auth } from "firebase-admin/auth";

import { UserService } from "../../user/user.service";
import { UserEntity } from "../../user/user.entity";
import { APP_PROVIDER } from "../auth.constants";

// https://socket.io/docs/v4/handling-cors/
const ExtractJwtFromSocketIoHandshake: JwtFromRequestFunction = (req: Request) => {
  // @ts-ignore
  return ExtractJwt.fromAuthHeaderWithScheme("bearer")(req.handshake);
};

@Injectable()
export class FirebaseWsStrategy extends PassportStrategy(Strategy, "firebase-ws") {
  protected readonly logger = new Logger(FirebaseWsStrategy.name);

  constructor(
    @Inject(APP_PROVIDER)
    private readonly admin: Auth,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwtFromSocketIoHandshake,
    });
  }

  public async validate(payload: string): Promise<UserEntity> {
    const data = await this.admin.verifyIdToken(payload, true).catch((error: unknown) => {
      this.logger.error(error);
      throw new WsException("unauthorized");
    });

    const userEntity = await this.userService.findOne({ sub: data.sub });

    if (!userEntity) {
      throw new WsException("userNotFound");
    }

    return userEntity;
  }
}
