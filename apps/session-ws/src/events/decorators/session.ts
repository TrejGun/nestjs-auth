import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Socket} from "socket.io";

export const Session = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const socket = context.switchToWs().getClient<Socket>();
  // @ts-ignore
  return socket.client.request.session as Record<string, any>;
});
