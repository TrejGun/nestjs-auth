import {MigrationInterface, QueryRunner, Table} from "typeorm";

import {ns} from "../common/constants";

export class AddAuthTable1572880566396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: `${ns}.auth`,
      columns: [
        {
          name: "id",
          type: "serial",
          isPrimary: true,
        },
        {
          name: "user_id",
          type: "int",
        },
        {
          name: "refresh_token",
          type: "varchar",
        },
        {
          name: "refresh_token_expires_at",
          type: "bigint",
        },
        {
          name: "time_created_at",
          type: "timestamptz",
        },
        {
          name: "time_updated_at",
          type: "timestamptz",
        },
      ],
      foreignKeys: [
        {
          columnNames: ["user_id"],
          referencedColumnNames: ["id"],
          referencedTableName: `${ns}.user`,
          onDelete: "CASCADE",
        },
      ],
    });

    await queryRunner.createTable(table, true);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION delete_expired_tokens() RETURNS trigger
      LANGUAGE plpgsql
      AS $$
        BEGIN
          DELETE FROM ${ns}.auth WHERE time_created_at < NOW() - INTERVAL '30 days';
          RETURN NEW;
        END;
      $$;
    `);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS delete_expired_tokens_trigger ON ${ns}.auth;
      CREATE TRIGGER delete_expired_tokens_trigger
      AFTER INSERT ON ${ns}.auth
      EXECUTE PROCEDURE delete_expired_tokens()
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(`${ns}.auth`);
  }
}
