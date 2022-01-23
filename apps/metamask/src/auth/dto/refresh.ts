import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

import { IRefreshDto } from "../interfaces";

export class JwtRefreshTokenDto implements IRefreshDto {
  @ApiProperty()
  @IsString()
  public refreshToken: string;
}
