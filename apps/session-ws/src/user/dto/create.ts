import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

import { IUserCreateDto } from "../interfaces";

export class UserCreateDto implements IUserCreateDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  public password: string;
}
