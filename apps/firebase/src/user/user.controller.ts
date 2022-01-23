import { ClassSerializerInterceptor, Controller, Get, UseInterceptors, Delete, HttpCode, Param } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { Roles, User } from "../common/decorators";
import { UserEntity } from "./user.entity";
import { UserRole } from "./interfaces";
import { UserService } from "./user.service";

@ApiBearerAuth()
@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  public getGloballyProtectedProfile(@User() userEntity: UserEntity): UserEntity {
    return userEntity;
  }

  @Get("/")
  @Roles(UserRole.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  public findAll(): Promise<{ rows: Array<UserEntity>; count: number }> {
    return this.userService.findAndCount().then(([rows, count]) => ({ rows, count }));
  }

  @Delete("/:id")
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  public async delete(@Param("id") id: number): Promise<void> {
    await this.userService.delete({ id });
  }
}
