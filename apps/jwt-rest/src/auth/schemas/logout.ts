import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

import { ILogoutFields } from "../interfaces";

export class JwtLogoutSchema implements ILogoutFields {
  @ApiProperty()
  @IsString()
  public refreshToken: string;
}
