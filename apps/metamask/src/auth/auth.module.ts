import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { AuthEntity } from "./auth.entity";
import { UserModule } from "../user/user.module";
import { MetamaskStrategy, JwtStrategy } from "./strategies";
import { accessTokenExpiresIn } from "./auth.constants";
import { AuthMetamaskController } from "./auth.metamask.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
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
  controllers: [AuthMetamaskController],
  providers: [AuthService, JwtStrategy, MetamaskStrategy],
  exports: [AuthService],
})
export class AuthModule {}
