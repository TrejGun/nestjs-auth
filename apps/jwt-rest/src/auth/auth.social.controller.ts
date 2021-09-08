import { Controller, Get, UseGuards } from "@nestjs/common";

import { IJwt } from "../common/jwt";
import { FirebaseGuard } from "../common/guards";
import { UserEntity } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { Public, User } from "../common/decorators";

@Public()
@Controller("/auth")
export class AuthSocialController {
  constructor(private readonly authService: AuthService) {}

  @Get("/firebase")
  @UseGuards(FirebaseGuard)
  public firebaseLogin(@User() userEntity: UserEntity): Promise<IJwt> {
    return this.authService.loginUser(userEntity);
  }
}
