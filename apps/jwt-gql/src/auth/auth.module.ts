import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";

import {AuthService} from "./auth.service";
import {UserModule} from "../user/user.module";
import {AuthResolver} from "./auth.resolver";
import {AuthEntity} from "./auth.entity";
import {JwtStrategy} from "./strategies";
import {accessTokenExpiresIn} from "./auth.constants";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET_KEY"),
        signOptions: {
          expiresIn: accessTokenExpiresIn,
        },
      }),
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
