import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationUserToInsRequests1714048747652 implements MigrationInterface {
    name = 'AddRelationUserToInsRequests1714048747652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ins-requests" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "ins-requests" ADD CONSTRAINT "FK_7a0c738b06f7fab912d78de74cf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ins-requests" DROP CONSTRAINT "FK_7a0c738b06f7fab912d78de74cf"`);
        await queryRunner.query(`ALTER TABLE "ins-requests" DROP COLUMN "userId"`);
    }

}
