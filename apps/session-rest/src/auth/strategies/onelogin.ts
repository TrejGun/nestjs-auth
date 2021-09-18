import { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-openidconnect";
import passport from "passport";

import { UserService } from "../../user/user.service";
import { UserEntity } from "../../user/user.entity";

@Injectable()
export class OneloginStrategy extends Strategy {
  public name = "onelogin";

  constructor(private readonly userService: UserService) {
    super(
      {
        issuer: `${process.env.OIDC_BASE_URI as string}`,
        clientID: process.env.OIDC_CLIENT_ID,
        clientSecret: process.env.OIDC_CLIENT_SECRET,
        authorizationURL: `${process.env.OIDC_BASE_URI as string}/auth`,
        userInfoURL: `${process.env.OIDC_BASE_URI as string}/me`,
        tokenURL: `${process.env.OIDC_BASE_URI as string}/token`,
        callbackURL: process.env.OIDC_REDIRECT_URI,
      },
      (issuer: string, sub: string, profile: any, cb: (err: Error | null, user?: UserEntity) => void) => {
        this.userService
          .findOne({ email: profile._json.email })
          .then(userEntity => {
            if (!userEntity) {
              cb(new UnauthorizedException());
            }
            cb(null, userEntity);
          })
          .catch(() => cb(new UnauthorizedException()));
      },
    );
    passport.use(this);
  }

  authenticate(req: Request, options?: Record<string, any>): void {
    super.authenticate(req, options);
  }
}
