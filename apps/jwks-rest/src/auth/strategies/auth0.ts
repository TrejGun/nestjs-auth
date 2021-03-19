import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {passportJwtSecret} from "jwks-rsa";

import {UserService} from "../../user/user.service";
import {UserEntity} from "../../user/user.entity";

@Injectable()
export class JwtAuth0Strategy extends PassportStrategy(Strategy, "auth0") {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ["RS256"],
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
