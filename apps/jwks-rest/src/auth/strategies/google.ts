import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {passportJwtSecret} from "jwks-rsa";

import {UserService} from "../../user/user.service";
import {UserEntity} from "../../user/user.entity";

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
      }),
      issuer: "https://accounts.google.com",
      algorithms: ["RS256"],
      scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    });
  }

  public async validate(payload: {email: string}): Promise<UserEntity> {
    const userEntity = await this.userService.findOne({email: payload.email});

    if (userEntity) {
      return userEntity;
    }

    throw new UnauthorizedException();
  }
}
