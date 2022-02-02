import { Repository, FindConditions } from "typeorm";

import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "./user.entity";
import { IUserCreateDto, UserRole } from "./interfaces";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  public findOne(where: FindConditions<UserEntity>): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ where });
  }

  public findAndCount(): Promise<[Array<UserEntity>, number]> {
    return this.userEntityRepository.findAndCount();
  }

  public async create(dto: IUserCreateDto): Promise<UserEntity> {
    const userEntity = await this.findOne({ email: dto.email });

    if (userEntity) {
      throw new ConflictException();
    }

    return this.userEntityRepository
      .create({
        ...dto,
        roles: [UserRole.USER],
      })
      .save();
  }
}
