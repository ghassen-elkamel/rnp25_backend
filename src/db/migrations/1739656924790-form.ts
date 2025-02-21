import { MigrationInterface, QueryRunner } from "typeorm";

export class Form1739656924790 implements MigrationInterface {
    name = 'Form1739656924790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_event" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e112999fd749c4275cc89aec8b3" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_cc6b38fd7540767b0076eab4adb" DEFAULT getdate(), "createdBy" int, "uuid" nvarchar(255) NOT NULL, "usersId" int, "eventId" int, CONSTRAINT "PK_4245a6b002b13f12e426d9db3ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "form" ADD "isSignUpForm" bit NOT NULL CONSTRAINT "DF_275229c9b8f55766d9529b12e0d" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_3145bb3b1f11a4b680a8cd4f2a5" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_6a41d7c0f21abb37cd273824fa6" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_6a41d7c0f21abb37cd273824fa6"`);
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_3145bb3b1f11a4b680a8cd4f2a5"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "DF_275229c9b8f55766d9529b12e0d"`);
        await queryRunner.query(`ALTER TABLE "form" DROP COLUMN "isSignUpForm"`);
        await queryRunner.query(`DROP TABLE "user_event"`);
    }

}
