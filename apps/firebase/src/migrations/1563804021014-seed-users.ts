import { MigrationInterface, QueryRunner } from "typeorm";

import { ns } from "../common/constants";

export class SeedUsers1563804021014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      INSERT INTO ${ns}.user (
        sub,
        roles
      ) VALUES (
        'w8xC5gBdzSRi0LlBfRZqzxqzKe13',
        '{ADMIN}'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE ${ns}.user RESTART IDENTITY CASCADE;`);
  }
}
