import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";
import {ConfigModule, ConfigService} from "@nestjs/config";

import ormconfig from "../ormconfig";
import {AuthResolver} from "./auth.resolver";
import {AuthEntity} from "./auth.entity";
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {accessTokenExpiresIn} from "./auth.constants";
import {JwtStrategy} from "./strategies";

describe("AuthResolver", () => {
  let resolver: AuthResolver;

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
      providers: [AuthService, JwtStrategy, AuthResolver],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
