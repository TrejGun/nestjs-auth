import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

import { IUserCreateDto } from "../interfaces";

export class UserCreateDto implements IUserCreateDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  public biometricPublicKey: string;
}
