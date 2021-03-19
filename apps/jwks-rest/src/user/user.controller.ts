import {Controller, Get} from "@nestjs/common";

import {UserEntity} from "./user.entity";
import {Roles, User} from "../common/decorators";
import {UserRole} from "./interfaces";
import {UserService} from "./user.service";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  public getProfile(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Get("/")
  @Roles(UserRole.ADMIN)
  public findAll(): Promise<{list: UserEntity[]; count: number}> {
    return this.userService.findAndCount().then(([list, count]) => ({list, count}));
  }
}
