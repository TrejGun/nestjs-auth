import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {GqlExecutionContext} from "@nestjs/graphql";

import {IUser} from "../../user/interfaces";

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  return (GqlExecutionContext.create(ctx).getContext().req.user as IUser) || null;
});
