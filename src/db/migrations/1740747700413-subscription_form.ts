import { MigrationInterface, QueryRunner } from "typeorm";

export class SubscriptionForm1740747700413 implements MigrationInterface {
    name = 'SubscriptionForm1740747700413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription_option" DROP CONSTRAINT "FK_b8682eb15815079918f8ccca957"`);
        await queryRunner.query(`ALTER TABLE "subscription_option" DROP COLUMN "subscirptionFormId"`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD "subscriptionOptionId" int`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD CONSTRAINT "FK_d485c73e8402fdc9f2bf90c24e5" FOREIGN KEY ("subscriptionOptionId") REFERENCES "subscription_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP CONSTRAINT "FK_d485c73e8402fdc9f2bf90c24e5"`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP COLUMN "subscriptionOptionId"`);
        await queryRunner.query(`ALTER TABLE "subscription_option" ADD "subscirptionFormId" int`);
        await queryRunner.query(`ALTER TABLE "subscription_option" ADD CONSTRAINT "FK_b8682eb15815079918f8ccca957" FOREIGN KEY ("subscirptionFormId") REFERENCES "subscirption_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
