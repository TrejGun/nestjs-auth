import { FindOptionsWhere, Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  public findOne(where: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userEntityRepository.findOne({ where });
  }

  public findAndCount(): Promise<[Array<UserEntity>, number]> {
    return this.userEntityRepository.findAndCount();
  }
}
