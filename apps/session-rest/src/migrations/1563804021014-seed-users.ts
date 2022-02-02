import { MigrationInterface, QueryRunner } from "typeorm";

import { ns } from "../common/constants";

export class SeedUsers1563804021014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const passwordHash = "6c9311b5a0c96b76e6535d5c57a96d67a405779d2284aaf154148cdcbefc5af6"; // My5up3r5tr0ngP@55w0rd

    await queryRunner.query(`
      INSERT INTO ${ns}.user (
        email,
        password,
        roles
      ) VALUES (
        'trejgun@gmail.com',
        '${passwordHash}',
        '{ADMIN}'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE ${ns}.user RESTART IDENTITY CASCADE;`);
  }
}
