import { MigrationInterface, QueryRunner } from "typeorm";

export class InsRequestTable1714047590665 implements MigrationInterface {
    name = 'InsRequestTable1714047590665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ins-requests" ("id" SERIAL NOT NULL, "client" character varying NOT NULL, "amount" integer NOT NULL, "reason" character varying NOT NULL, "details" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "insContractId" integer, CONSTRAINT "PK_bfeb67d58c6b042a56f750d5a15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ins-requests" ADD CONSTRAINT "FK_96aa7929dfe48375386c96195a7" FOREIGN KEY ("insContractId") REFERENCES "ins-contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ins-requests" DROP CONSTRAINT "FK_96aa7929dfe48375386c96195a7"`);
        await queryRunner.query(`DROP TABLE "ins-requests"`);
    }

}
