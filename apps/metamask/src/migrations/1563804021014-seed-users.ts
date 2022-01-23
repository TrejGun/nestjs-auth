import { MigrationInterface, QueryRunner } from "typeorm";

import { ns } from "../common/constants";

export class SeedUsers1563804021014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      INSERT INTO ${ns}.user (
        wallet,
        roles
      ) VALUES (
        '0x87efa7f59bAA8e475F181B36f77A3028494a2cf6',
        '{ADMIN}'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE ${ns}.user RESTART IDENTITY CASCADE;`);
  }
}
