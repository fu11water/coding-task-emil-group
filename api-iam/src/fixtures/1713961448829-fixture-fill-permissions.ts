import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixtureFillPermissions1713961448829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "permissions" (id, name, description) VALUES 
      (1, 'user-add', 'Allow user to add other users'),
      (2, 'user-edit', 'Allow user to edit users records'),
      (3, 'user-delete', 'Allow user to delete users records'),
      (4, 'insurance-request-add', 'Allow user to add claim\damage insurance request'),
      (5, 'insurance-request-edit', 'Allow user to edit claim\damage insurance request'),
      (6, 'insurance-request-delete', 'Allow user to delete claim\damage insurance request'),
      (7, 'insurance-contract-add', 'Allow user to add insurance contract'),
      (8, 'insurance-contract-edit', 'Allow user to edit insurance contract'),
      (9, 'insurance-contract-delete', 'Allow user to delete insurance contract');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "permissions" WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9);`,
    );
  }
}
