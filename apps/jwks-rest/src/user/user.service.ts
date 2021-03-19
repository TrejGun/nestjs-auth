import {FindConditions, Repository} from "typeorm";

import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {UserEntity} from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  public findOne(where: FindConditions<UserEntity>): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({where});
  }

  public findAndCount(): Promise<[UserEntity[], number]> {
    return this.userEntityRepository.findAndCount();
  }
}
