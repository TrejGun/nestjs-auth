import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";

import { UserModule } from "../user/user.module";
import { JwtAppleStrategy, JwtAuth0Strategy, JwtGoogleStrategy } from "./strategies";

@Module({
  imports: [UserModule, PassportModule, ConfigModule],
  providers: [JwtAppleStrategy, JwtAuth0Strategy, JwtGoogleStrategy],
})
export class AuthModule {}
