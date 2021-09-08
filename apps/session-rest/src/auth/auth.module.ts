import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";

import { UserModule } from "../user/user.module";
import { SessionSerializer } from "./session.serializer";
import { AuthController } from "./auth.controller";
import { BiometricStrategy, FacebookStrategy, GoogleStrategy, LocalStrategy } from "./strategies";

@Module({
  imports: [UserModule, PassportModule, ConfigModule],
  providers: [BiometricStrategy, FacebookStrategy, GoogleStrategy, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
