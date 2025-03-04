import { MigrationInterface, QueryRunner } from "typeorm";

export class SubscriptionForm1740750776098 implements MigrationInterface {
    name = 'SubscriptionForm1740750776098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_5e8a53512c649439fc45f5834e" ON "subscirption_form" ("userId") WHERE "userId" IS NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "REL_5e8a53512c649439fc45f5834e" ON "subscirption_form"`);
    }

}
