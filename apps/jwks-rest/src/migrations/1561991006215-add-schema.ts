import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTestSchema1561991006215 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropSchema("test");
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createSchema("test", true);
  }
}
