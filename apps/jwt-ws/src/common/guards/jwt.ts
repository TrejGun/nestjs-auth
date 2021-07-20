import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // `super` has to be called to set `user` on `request`
    // see https://github.com/nestjs/passport/blob/master/lib/auth.guard.ts
    return (super.canActivate(context) as Promise<boolean>).catch(e => {
      const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      console.error(e);
      throw new WsException("unauthorized");
    });
  }
}
