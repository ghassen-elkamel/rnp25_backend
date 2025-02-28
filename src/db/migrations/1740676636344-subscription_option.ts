import { MigrationInterface, QueryRunner } from "typeorm";

export class SubscriptionOption1740676636344 implements MigrationInterface {
    name = 'SubscriptionOption1740676636344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP COLUMN "subscriptionType"`);
        await queryRunner.query(`ALTER TABLE "subscription_option" ADD "subscirptionFormId" int`);
        await queryRunner.query(`ALTER TABLE "subscription_option" ADD CONSTRAINT "FK_b8682eb15815079918f8ccca957" FOREIGN KEY ("subscirptionFormId") REFERENCES "subscirption_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription_option" DROP CONSTRAINT "FK_b8682eb15815079918f8ccca957"`);
        await queryRunner.query(`ALTER TABLE "subscription_option" DROP COLUMN "subscirptionFormId"`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD "subscriptionType" nvarchar(255) NOT NULL`);
    }

}
