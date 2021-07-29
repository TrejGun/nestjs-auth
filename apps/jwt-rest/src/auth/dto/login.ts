import { ApiProperty } from "@nestjs/swagger";

import { IsString, IsEmail, MinLength } from "class-validator";

import { ILoginDto } from "../interfaces";

export class LoginDto implements ILoginDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  public password: string;
}
