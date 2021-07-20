import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Socket} from "socket.io";

import {IUser} from "../../user/interfaces";

export const User = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const socket = context.switchToWs().getClient<Socket>();
  // @ts-ignore
  return (socket.client.request.user as IUser) || null;
});
