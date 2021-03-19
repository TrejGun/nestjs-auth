import {Query, Resolver} from "@nestjs/graphql";
import {User, Roles} from "../common/decorators";
import {UserRole} from "./interfaces";

import {UserEntity} from "./user.entity";
import {UserService} from "./user.service";
import {UserListType, UserType} from "./types";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(_returns => UserType)
  public profile(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Roles(UserRole.ADMIN)
  @Query(_returns => UserListType)
  public listUsers(): Promise<UserListType> {
    return this.userService.findAndCount().then(([list, count]) => ({list, count}));
  }
}
