import {MigrationInterface, QueryRunner} from "typeorm";

import {ns} from "../common/constants";

export class AddTsdSchema1561991006215 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropSchema(ns);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createSchema(ns, true);
  }
}
