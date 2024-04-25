import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixtureFillRolesPermissions1713965905052
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "roles_permissions_permissions" ("rolesId", "permissionsId") VALUES 
                  (1, 1),
                  (1, 2),
                  (1, 3),
                  (1, 4),
                  (1, 5),
                  (1, 6),
                  (1, 7),
                  (1, 8),
                  (1, 9),
                  (2, 1),
                  (2, 2),
                  (2, 3),
                  (3, 4),
                  (3, 5),
                  (3, 6),
                  (3, 7),
                  (3, 8),
                  (3, 9);
                  `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE ALL FROM "roles_permissions_permissions";`);
  }
}
