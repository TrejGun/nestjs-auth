import {MigrationInterface, QueryRunner} from "typeorm";

export class SetupUser1563804021014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("TRUNCATE TABLE test.user RESTART IDENTITY CASCADE;");

    await queryRunner.query(`
      INSERT INTO test.user (
        email,
        roles
      ) VALUES (
        'trejgun@gmail.com',
        '{ADMIN}'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("TRUNCATE TABLE test.user RESTART IDENTITY CASCADE;");
  }
}
