import { MigrationInterface, QueryRunner } from "typeorm";

export class SubsciptionForm1740489380842 implements MigrationInterface {
    name = 'SubsciptionForm1740489380842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscirption_form" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_a8ced0a919de172a411d084c5d5" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_87b33936863acb9c79099b945cb" DEFAULT getdate(), "createdBy" int, "positionType" nvarchar(255) NOT NULL, "positionTitle" nvarchar(255) NOT NULL, "olMName" nvarchar(255) NOT NULL, "subscriptionType" nvarchar(255) NOT NULL, "userId" int, CONSTRAINT "PK_cdae72d1f03f8e5debda6f4378c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD CONSTRAINT "FK_5e8a53512c649439fc45f5834ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP CONSTRAINT "FK_5e8a53512c649439fc45f5834ec"`);
        await queryRunner.query(`DROP TABLE "subscirption_form"`);
    }

}
