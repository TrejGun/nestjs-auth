import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";

import {AuthService} from "./auth.service";
import {UserModule} from "../user/user.module";
import {AuthEntity} from "./auth.entity";
import {accessTokenExpiresIn} from "./auth.constants";
import {JwtStrategy} from "./strategies";
import {TypeOrmConfigService} from "../typeorm.options";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([AuthEntity]),
        UserModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {
            expiresIn: accessTokenExpiresIn,
          },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
