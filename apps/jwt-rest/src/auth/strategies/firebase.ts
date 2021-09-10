import { ExtractJwt, Strategy } from "passport-firebase-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import admin from "firebase-admin";

import { UserService } from "../../user/user.service";
import { UserEntity } from "../../user/user.entity";

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, "firebase") {
  protected readonly logger = new Logger(FirebaseStrategy.name);

  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    admin.initializeApp();
  }

  public async validate(payload: string): Promise<UserEntity | null> {
    const { email } = await admin
      .auth()
      .verifyIdToken(payload, true)
      .catch(error => {
        this.logger.error(error);
        throw new UnauthorizedException("unauthorized");
      });

    if (!email) {
      throw new UnauthorizedException("unauthorized");
    }

    const userEntity = await this.userService.findOne({ email });

    if (!userEntity) {
      throw new UnauthorizedException();
    }

    return userEntity;
  }
}
