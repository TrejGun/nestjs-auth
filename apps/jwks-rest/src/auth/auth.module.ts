import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";

import { UserModule } from "../user/user.module";
import { AppleStrategy, Auth0Strategy, CognitoStrategy, GoogleStrategy } from "./strategies";

@Module({
  imports: [UserModule, PassportModule, ConfigModule],
  providers: [AppleStrategy, Auth0Strategy, GoogleStrategy, CognitoStrategy],
})
export class AuthModule {}
