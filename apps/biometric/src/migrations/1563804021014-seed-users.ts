import { MigrationInterface, QueryRunner } from "typeorm";

import { ns } from "../common/constants";

export class SeedUsers1563804021014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const biometricPublicKey =
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyiLoIn" +
      "CN1qeo1k3JeEjpMKpbpZhiwSOMFQ9PgA0xFNK1EHh5sGdfwiVc" +
      "Xc5JV8ciXJLjbXO+4W5WWlKz26K3Cl3zLn92kQCkEnxhO2aqS9" +
      "OZ4AIwo0/ww7+QD6q57/UJFsqaTHAdetb2E3jrDDFZX5kegAV+" +
      "xXh38+nP8Zopx/A8DXI6P9FKBwpZredRqd3gw3j6bNiEmGW9wZ" +
      "CU3kghi7u3bWbjkmrN35Sg8CGnx2r0krAskx4I5JMKeYetr4fK" +
      "xxoArF9XJHl5gi/2aUk342iFTbZtRKIRbgFkeeUqTw7e5QsSFl" +
      "AFGIWkIq1QSveH0PnFe2nidZHpGKWeiSsqGQIDAQAB";

    await queryRunner.query(`
      INSERT INTO ${ns}.user (
        email,
        biometric_public_key,
        roles
      ) VALUES (
        'trejgun@gmail.com',
        '${biometricPublicKey}',
        '{ADMIN}'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE ${ns}.user RESTART IDENTITY CASCADE;`);
  }
}
