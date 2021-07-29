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

import { ns } from "../common/constants";
import { UserEntity } from "../user/user.entity";
import { IAuth } from "./interfaces";

@Entity({ schema: ns, name: "auth" })
export class AuthEntity extends BaseEntity implements IAuth {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public refreshToken: string;

  @Column({ type: "bigint" })
  public refreshTokenExpiresAt: number;

  @JoinColumn()
  @OneToOne(_type => UserEntity)
  public user: UserEntity;

  @Column({ type: "int" })
  public userId: number;

  @Column({ type: "timestamptz" })
  public createdAt: string;

  @Column({ type: "timestamptz" })
  public updatedAt: string;

  @BeforeInsert()
  public beforeInsert(): void {
    const date = new Date();
    this.createdAt = date.toISOString();
    this.updatedAt = date.toISOString();
  }

  @BeforeUpdate()
  public beforeUpdate(): void {
    const date = new Date();
    this.updatedAt = date.toISOString();
  }
}
