import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Jwt } from "./types";
import { AuthService } from "./auth.service";
import { IJwt } from "../common/jwt";
import { UserService } from "../user/user.service";
import { UserCreateInputType } from "../user/types";
import { Public } from "../common/decorators";

@Resolver(() => Jwt)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Mutation(_returns => Jwt)
  async login(@Args("email") email: string, @Args("password") password: string): Promise<IJwt> {
    return this.authService.login({ email, password });
  }

  @Public()
  @Mutation(_returns => Jwt)
  async refreshToken(@Args("refreshToken") refreshToken: string): Promise<IJwt> {
    return this.authService.refresh({ refreshToken });
  }

  @Mutation(_returns => Boolean)
  async logout(@Args("refreshToken") refreshToken: string): Promise<boolean> {
    await this.authService.delete({ refreshToken });
    return true;
  }

  @Public()
  @Mutation(_returns => Jwt)
  async signup(@Args("input") data: UserCreateInputType): Promise<IJwt> {
    const userEntity = await this.userService.create(data);
    return this.authService.loginUser(userEntity);
  }
}
