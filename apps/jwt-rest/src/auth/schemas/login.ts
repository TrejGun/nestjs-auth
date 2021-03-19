import {ApiProperty} from "@nestjs/swagger";

import {IsString, IsEmail, MinLength} from "class-validator";

import {ILoginFields} from "../interfaces";

export class LoginSchema implements ILoginFields {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  public password: string;
}
