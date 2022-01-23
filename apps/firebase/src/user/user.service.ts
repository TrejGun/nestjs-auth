import { Injectable, NotFoundException, Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, Repository } from "typeorm";

import { UserEntity } from "./user.entity";
import { IUserCreateDto, UserRole } from "./interfaces";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findOne(where: FindConditions<UserEntity>): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ where });
  }

  public findAndCount(): Promise<[Array<UserEntity>, number]> {
    return this.userEntityRepository.findAndCount();
  }

  public async create(dto: IUserCreateDto): Promise<UserEntity> {
    return this.userEntityRepository
      .create({
        ...dto,
        roles: [UserRole.USER],
      })
      .save();
  }

  public async delete(where: FindConditions<UserEntity>): Promise<UserEntity> {
    const userEntity = await this.findOne(where);

    if (!userEntity) {
      throw new NotFoundException("userNotFound");
    }

    await this.authService.delete(userEntity);
    return userEntity.remove();
  }
}
