import { MigrationInterface, QueryRunner } from "typeorm";

export class SubsciptionFormReciept1740928923715 implements MigrationInterface {
    name = 'SubsciptionFormReciept1740928923715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD "uuid" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP COLUMN "uuid"`);
    }

}
