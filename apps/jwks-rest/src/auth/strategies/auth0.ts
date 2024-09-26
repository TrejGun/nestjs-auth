import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { passportJwtSecret } from "jwks-rsa";

import { UserService } from "../../user/user.service";
import { UserEntity } from "../../user/user.entity";

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, "auth0") {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>("AUTH0_ISSUER_URL", "")}.well-known/jwks.json`,
      }),
      audience: configService.get<string>("AUTH0_AUDIENCE", ""),
      issuer: configService.get<string>("AUTH0_ISSUER_URL", ""),
      algorithms: ["RS256"],
    });
  }

  public async validate(payload: { email: string }): Promise<UserEntity> {
    const userEntity = await this.userService.findOne({ email: payload.email });

    if (!userEntity) {
      throw new UnauthorizedException();
    }

    return userEntity;
  }
}
