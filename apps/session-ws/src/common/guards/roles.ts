import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

import { UserRole } from "../../user/interfaces";
import { UserEntity } from "../../user/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Array<UserRole>>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || !roles.length) {
      return true;
    }
    const socket = context.switchToWs().getClient<Socket>();
    // @ts-ignore
    const userEntity = socket.client.request.user as UserEntity;

    const hasRole = userEntity.roles.some((role: UserRole) => !!roles.find(item => item === role));

    if (hasRole) {
      return true;
    }

    throw new WsException("userHasWrongRole");
  }
}
