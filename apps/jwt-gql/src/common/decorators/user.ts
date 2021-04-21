import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {GqlExecutionContext} from "@nestjs/graphql";

import {IUser} from "../../user/interfaces";

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const context = GqlExecutionContext.create(ctx);
  return (context.getContext().req.user as IUser) || null;
});
