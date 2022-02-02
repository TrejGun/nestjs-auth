import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { UserEntity } from "./user.entity";
import { Roles, User } from "../common/decorators";
import { UserRole } from "./interfaces";
import { UserService } from "./user.service";

@ApiBearerAuth()
@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  @UseInterceptors(ClassSerializerInterceptor)
  public getGloballyProtectedProfile(@User() userEntity: UserEntity): UserEntity {
    return userEntity;
  }

  @Get("/")
  @Roles(UserRole.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  public findAll(): Promise<{ rows: Array<UserEntity>; count: number }> {
    return this.userService.findAndCount().then(([rows, count]) => ({ rows, count }));
  }
}
