import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

import { ILogoutDto } from "../interfaces";

export class JwtLogoutDto implements ILogoutDto {
  @ApiProperty()
  @IsString()
  public refreshToken: string;
}
