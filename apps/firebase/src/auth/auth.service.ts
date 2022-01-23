import { Inject, Injectable } from "@nestjs/common";
import { app } from "firebase-admin";

import { UserEntity } from "../user/user.entity";
import { APP_PROVIDER } from "./auth.constants";

@Injectable()
export class AuthService {
  constructor(
    @Inject(APP_PROVIDER)
    private readonly admin: app.App,
  ) {}

  public delete(userEntity: UserEntity): Promise<void> {
    return this.admin.auth().deleteUser(userEntity.sub);
  }
}
