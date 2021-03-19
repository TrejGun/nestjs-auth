import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";

import {AuthResolver} from "./auth.resolver";
import {AuthEntity} from "./auth.entity";
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {accessTokenExpiresIn} from "./auth.constants";
import {JwtStrategy} from "./strategies";
import {TypeOrmConfigService} from "../typeorm.options";

describe("AuthResolver", () => {
  let resolver: AuthResolver;

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
          signOptions: {
            expiresIn: accessTokenExpiresIn,
          },
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
