import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";

import {AuthService} from "./auth.service";
import {AuthEntity} from "./auth.entity";
import {UserModule} from "../user/user.module";
import {AuthJwtController} from "./auth.jwt.controller";
import {JwtStrategy} from "./strategies";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthJwtController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
