import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

import { IRefreshFields } from "../interfaces";

export class JwtRefreshTokenSchema implements IRefreshFields {
  @ApiProperty()
  @IsString()
  public refreshToken: string;
}
