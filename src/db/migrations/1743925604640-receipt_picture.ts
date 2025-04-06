import { MigrationInterface, QueryRunner } from "typeorm";

export class ReceiptPicture1743925604640 implements MigrationInterface {
    name = 'ReceiptPicture1743925604640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD "pathPicture" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP COLUMN "pathPicture"`);
    }

}
