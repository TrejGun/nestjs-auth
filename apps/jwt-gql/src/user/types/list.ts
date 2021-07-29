import { Field, ObjectType } from "@nestjs/graphql";
import { UserType } from ".";

@ObjectType()
export class UserListType {
  @Field(_type => [UserType])
  public rows: Array<UserType>;

  @Field()
  public count: number;
}
