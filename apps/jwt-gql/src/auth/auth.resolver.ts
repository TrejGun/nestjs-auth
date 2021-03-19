import {Args, Mutation, Resolver} from "@nestjs/graphql";

import {AuthType} from "./types";
import {AuthService} from "./auth.service";
import {IAuth} from "./interfaces";
import {UserService} from "../user/user.service";
import {UserCreateInputType} from "../user/types";
import {Public} from "../common/decorators";

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Public()
  @Mutation(_returns => AuthType)
  async login(@Args("email") email: string, @Args("password") password: string): Promise<IAuth> {
    return this.authService.login({email, password});
  }

  @Public()
  @Mutation(_returns => AuthType)
  async refreshToken(@Args("refreshToken") refreshToken: string): Promise<IAuth> {
    return this.authService.refresh({refreshToken});
  }

  @Mutation(_returns => Boolean)
  async logout(@Args("refreshToken") refreshToken: string): Promise<boolean> {
    await this.authService.delete({refreshToken});
    return true;
  }

  @Public()
  @Mutation(_returns => AuthType)
  async signup(@Args("input") data: UserCreateInputType): Promise<IAuth> {
    const userEntity = await this.userService.create(data);
    return this.authService.loginUser(userEntity);
  }
}
