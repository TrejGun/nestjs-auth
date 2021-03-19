import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AuthGuard} from "@nestjs/passport";
import {Socket} from "socket.io";

@Injectable()
export class WsLocalGuard extends AuthGuard("local") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean {
    const isPublicHandler = this.reflector.get<boolean>("isPublic", context.getHandler());
    const isPublicClass = this.reflector.get<boolean>("isPublic", context.getClass());

    if (isPublicHandler || isPublicClass) {
      return true;
    }

    const socket = context.switchToWs().getClient<Socket>();
    const isAuthenticated: boolean = socket.client.request.isAuthenticated();

    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }

    return isAuthenticated;
  }
}
