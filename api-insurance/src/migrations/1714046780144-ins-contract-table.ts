import { MigrationInterface, QueryRunner } from "typeorm";

export class InsContractTable1714046780144 implements MigrationInterface {
    name = 'InsContractTable1714046780144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ins-contracts" ("id" SERIAL NOT NULL, "client" character varying NOT NULL, "form" character varying NOT NULL, "details" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bdfc89d7e15115cdcbfe946db1e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ins-contracts"`);
    }

}
