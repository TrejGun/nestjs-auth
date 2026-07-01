import { Inject, Injectable } from "@nestjs/common";
import { Auth } from "firebase-admin/auth";

import { UserEntity } from "../user/user.entity";
import { APP_PROVIDER } from "./auth.constants";

@Injectable()
export class AuthService {
  constructor(
    @Inject(APP_PROVIDER)
    private readonly admin: Auth,
  ) {}

  public delete(userEntity: UserEntity): Promise<void> {
    return this.admin.deleteUser(userEntity.sub);
  }
}
