import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";

import {UserService} from "../../user/user.service";
import {UserEntity} from "../../user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
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
