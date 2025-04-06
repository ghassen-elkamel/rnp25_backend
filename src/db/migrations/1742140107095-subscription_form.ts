import { MigrationInterface, QueryRunner } from "typeorm";

export class SubscriptionForm1742140107095 implements MigrationInterface {
    name = 'SubscriptionForm1742140107095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD "roomType" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD "roommates" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP COLUMN "roommates"`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP COLUMN "roomType"`);
    }

}
