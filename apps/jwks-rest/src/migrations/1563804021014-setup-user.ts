import { MigrationInterface, QueryRunner } from "typeorm";

import { ns } from "../common/constants";

export class SetupUser1563804021014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      INSERT INTO ${ns}.user (
        email,
        roles
      ) VALUES (
        'trejgun@gmail.com',
        '{ADMIN}'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE ${ns}.user RESTART IDENTITY CASCADE;`);
  }
}
