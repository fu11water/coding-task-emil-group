import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixtureFillUsers1714297499474 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "users" (name, login, password, "isActive", "roleId") VALUES 
                  ('super-admin','super-admin','$2b$10$9.oXFoMJokKntMLzrhTTvOCWYbX4awHrZdkMBk0sQtL4gNomM87CG',true,1),
                  ('admin','admin','$2b$10$EfqD4/Hh8xX7LCUxrYidcebbAicv9C7bqSk7Fng/NcWvwqG6baQOK',true,2),
                  ('manager','manager','$2b$10$LR0jM6fQQDMdaNHw6yACW.PmstGVg7uDQH8ZkfwduyJMyQvom8Pee',true,3),
                  ('blocked','blocked','$2b$10$Z1EbgHYp7al9fJnZmlHFCeMJyDnH8veg/RCsF5L5Hx7NC3C3/WFvC',true,4);
                  `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "users" WHERE login IN ('super-admin', 'admin', 'manager', 'blocked');`,
    );
  }
}
