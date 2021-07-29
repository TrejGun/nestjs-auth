import { Field, ObjectType } from "@nestjs/graphql";

import { IJwt } from "../../common/jwt";

@ObjectType()
export class Jwt implements IJwt {
  @Field()
  public accessToken: string;

  @Field()
  public refreshToken: string;

  @Field()
  public accessTokenExpiresAt: number;

  @Field()
  public refreshTokenExpiresAt: number;
}
