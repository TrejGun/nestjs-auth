import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";
import {ConfigModule, ConfigService} from "@nestjs/config";

import ormconfig from "../ormconfig";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./strategies";
import {SessionSerializer} from "./session.serializer";

describe("AuthService", () => {
  let servcontrollerce: AuthController;

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
        UserModule,
        PassportModule,
      ],
      providers: [LocalStrategy, SessionSerializer],
      controllers: [AuthController],
    }).compile();

    servcontrollerce = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(servcontrollerce).toBeDefined();
  });
});
