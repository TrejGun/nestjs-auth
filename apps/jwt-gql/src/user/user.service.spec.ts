import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";

import {UserService} from "./user.service";
import ormconfig from "../ormconfig";
import {UserEntity} from "./user.entity";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([UserEntity])],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
