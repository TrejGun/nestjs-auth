import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { GqlExecutionContext } from "@nestjs/graphql";

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

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req as Request;

    const userEntity = request.user as UserEntity;

    const hasRole = userEntity.roles.some((role: UserRole) => !!roles.find(item => item === role));

    if (hasRole) {
      return true;
    }

    throw new UnauthorizedException("userHasWrongRole");
  }
}
