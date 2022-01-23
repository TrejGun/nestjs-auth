import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ns } from "../common/constants";
import { IUser, UserRole } from "./interfaces";

@Entity({ schema: ns, name: "user" })
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public wallet: string;

  @Column({
    type: "enum",
    enum: UserRole,
    array: true,
  })
  public roles: Array<UserRole>;
}
