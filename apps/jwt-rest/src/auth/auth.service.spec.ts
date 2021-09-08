import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import ormconfig from "../ormconfig";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AuthEntity } from "./auth.entity";
import { BiometricStrategy, FacebookStrategy, GoogleStrategy, JwtStrategy } from "./strategies";
import { accessTokenExpiresIn } from "./auth.constants";
import { OneloginStrategyFactory } from "./onelogin.factory";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env",
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              ...ormconfig,
              url: configService.get<string>("POSTGRES_URL", "postgres://postgres:password@127.0.0.1/postgres"),
              keepConnectionAlive: configService.get<string>("NODE_ENV", "development") === "test",
            };
          },
        }),
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
      ],
      providers: [
        AuthService,
        JwtStrategy,
        BiometricStrategy,
        FacebookStrategy,
        GoogleStrategy,
        OneloginStrategyFactory,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
