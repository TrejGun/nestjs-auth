import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";

import { ns } from "../common/constants";
import { UserService } from "../user/user.service";
import { UserEntity } from "../user/user.entity";
import { IUserCreateDto } from "../user/interfaces";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signup(data: IUserCreateDto): Promise<UserEntity> {
    return this.userService.create(data);
  }

  public logout(req: Request, res: Response): void {
    req.session.destroy(console.error);
    req.logout(console.error);
    res.clearCookie(ns);
    res.status(204);
    res.send("");
  }
}
