import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Socket} from "socket.io";

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const socket = context.switchToWs().getClient<Socket>();
    return next.handle().pipe(
      finalize(() => {
        socket.client.request.session.save();
      }),
    );
  }
}
