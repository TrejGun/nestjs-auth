import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../user/user.module";
import { SessionSerializer } from "./session.serializer";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategies";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModule, PassportModule],
  providers: [LocalStrategy, SessionSerializer, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
