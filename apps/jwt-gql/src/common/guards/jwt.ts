import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // `super` has to be called to set `user` on `request` for @Public routes
    // see https://github.com/nestjs/passport/blob/master/lib/auth.guard.ts
    return (super.canActivate(context) as Promise<boolean>).catch(e => {
      const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      throw new UnauthorizedException(e.message);
    });
  }

  // https://docs.nestjs.com/recipes/passport#graphql
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ctx.getContext().req;
  }
}
