import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import {ns} from "../common/constants";
import {UserEntity} from "../user/user.entity";
import {IAuth} from "./interfaces";

@Entity({schema: ns, name: "auth"})
export class AuthEntity extends BaseEntity implements IAuth {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "varchar"})
  public refreshToken: string;

  @Column({type: "int"})
  public refreshTokenExpiresAt: number;

  @JoinColumn()
  @OneToOne(_type => UserEntity)
  public user: UserEntity;

  @Column({type: "int"})
  public userId: number;

  @Column({type: "timestamptz"})
  public timeCreatedAt: string;

  @Column({type: "timestamptz"})
  public timeUpdatedAt: string;

  @BeforeInsert()
  public beforeInsert(): void {
    const date = new Date();
    this.timeCreatedAt = date.toISOString();
    this.timeUpdatedAt = date.toISOString();
  }

  @BeforeUpdate()
  public beforeUpdate(): void {
    const date = new Date();
    this.timeUpdatedAt = date.toISOString();
  }
}
