import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";

import {UserModule} from "../user/user.module";
import {JwtAppleStrategy, JwtAuth0Strategy, JwtGoogleStrategy} from "./strategies";

@Module({
  imports: [UserModule, PassportModule],
  providers: [JwtAppleStrategy, JwtAuth0Strategy, JwtGoogleStrategy],
})
export class AuthModule {}
