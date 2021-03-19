import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";

import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {TypeOrmConfigService} from "../typeorm.options";

describe("userService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
