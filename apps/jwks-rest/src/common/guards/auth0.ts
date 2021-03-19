import {Observable} from "rxjs";
import {ExecutionContext, Injectable, CanActivate} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class Auth0Guard extends AuthGuard("auth0") implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicHandler = this.reflector.get<boolean>("isPublic", context.getHandler());
    const isPublicClass = this.reflector.get<boolean>("isPublic", context.getClass());

    if (isPublicHandler || isPublicClass) {
      return true;
    }

    return super.canActivate(context);
  }
}
