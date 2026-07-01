import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getApp, initializeApp } from "firebase-admin";
import { Auth, getAuth } from "firebase-admin/auth";

import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { FirebaseStrategy, FirebaseWsStrategy } from "./strategies";
import { accessTokenExpiresIn, APP_PROVIDER } from "./auth.constants";

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    ConfigModule,
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
  ],
  providers: [
    AuthService,
    FirebaseStrategy,
    FirebaseWsStrategy,
    {
      provide: APP_PROVIDER,
      useFactory: (): Auth => {
        initializeApp();
        return getAuth(getApp());
      },
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
