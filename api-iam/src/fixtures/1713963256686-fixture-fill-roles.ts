import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixtureFillRoles1713963256686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "roles" (id, name, description) VALUES 
            (1, 'super-admin', 'Grant user full permissions for system'),
            (2, 'admin', 'Grant user permissions to operate with user, role, permission entities'),
            (3, 'manager', 'Grant user permissions to operate with insurance contract and insurance requests'),
            (4, 'blocked', 'User can only make non-guarded requests');
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "roles" WHERE id IN (1, 2, 3, 4);`);
  }
}
