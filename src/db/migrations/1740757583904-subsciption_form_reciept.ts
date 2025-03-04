import { MigrationInterface, QueryRunner } from "typeorm";

export class SubsciptionFormReciept1740757583904 implements MigrationInterface {
    name = 'SubsciptionFormReciept1740757583904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD "pathReciept" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP COLUMN "pathReciept"`);
    }

}
