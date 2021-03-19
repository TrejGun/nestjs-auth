import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

import {AuthService} from "./auth.service";
import {JwtStrategy} from "./strategies";
import {UserModule} from "../user/user.module";
import {AuthEntity} from "./auth.entity";
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
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
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
