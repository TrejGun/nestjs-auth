import {Issuer} from "openid-client";
import {ConfigService} from "@nestjs/config";

import {UserService} from "../user/user.service";
import {OneloginStrategy} from "./strategies";

export const OneloginStrategyFactory = {
  provide: "OneloginStrategy",
  inject: [UserService, ConfigService],
  useFactory: async (userService: UserService, configService: ConfigService): Promise<OneloginStrategy> => {
    // secret sauce! build the dynamic client before injecting it into the strategy
    // for use in the constructor super call.
    const TrustIssuer = await Issuer.discover(
      `https://${configService.get<string>(
        "ONELOGIN_SUBDOMAIN",
        "https://example.com/",
      )}.onelogin.com/oidc/.well-known/openid-configuration`,
    );
    const client = new TrustIssuer.Client({
      client_id: configService.get<string>("ONELOGIN_CLIENT_ID", ""),
      client_secret: configService.get<string>("ONELOGIN_CLIENT_SECRET", ""),
      token_endpoint_auth_method: "client_secret_post",
    });
    return new OneloginStrategy(userService, client);
  },
};
