import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";

import ormconfig from "../ormconfig";
import { AuthSessionController } from "./auth.session.controller";
import { UserModule } from "../user/user.module";
import { FacebookStrategy, GoogleStrategy, LocalStrategy, OneloginStrategy } from "./strategies";
import { SessionSerializer } from "./session.serializer";

describe("AuthService", () => {
  let servcontrollerce: AuthSessionController;

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
              url: configService.get<string>("POSTGRES_URL", "postgres://postgres:password@localhost/postgres"),
              keepConnectionAlive: configService.get<string>("NODE_ENV", "development") === "test",
            };
          },
        }),
        UserModule,
        PassportModule,
      ],
      providers: [FacebookStrategy, GoogleStrategy, LocalStrategy, OneloginStrategy, SessionSerializer],
      controllers: [AuthSessionController],
    }).compile();

    servcontrollerce = module.get<AuthSessionController>(AuthSessionController);
  });

  it("should be defined", () => {
    expect(servcontrollerce).toBeDefined();
  });
});
