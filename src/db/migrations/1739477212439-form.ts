import { MigrationInterface, QueryRunner } from "typeorm";

export class Form1739477212439 implements MigrationInterface {
    name = 'Form1739477212439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "form_responses" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_5bc10d232c32222ca3932db4019" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_57343da6baddf21ef78abbe4888" DEFAULT getdate(), "createdBy" int, "submittedAt" datetime2 NOT NULL CONSTRAINT "DF_54014aa29416fee84befdf309c9" DEFAULT getdate(), "formId" int, "userId" int, CONSTRAINT "PK_36a512e5574d0a366b40b26874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_5ae28fb5bec61b55403888a6b1b" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_4b7b6521cd036d181628b0c72fe" DEFAULT getdate(), "createdBy" int, "title" nvarchar(255) NOT NULL, "description" nvarchar(255), "isActive" bit NOT NULL CONSTRAINT "DF_2137fd6bd8ae5ac5d2f973f8893" DEFAULT 1, CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form_question" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_5bc5aa86b9da4b82b41726d8126" DEFAULT NEWSEQUENTIALID(), "question" nvarchar(255) NOT NULL, "type" nvarchar(255) CONSTRAINT CHK_769ef8dbcc778cb6815c7daaed_ENUM CHECK(type IN ('text','long_text','checkbox','radio','date','time','select','multiple_select','number','email','phone')) NOT NULL CONSTRAINT "DF_09e025e82a1be0d8f3c1404efa5" DEFAULT 'text', "options" nvarchar(max), "isRequired" bit NOT NULL CONSTRAINT "DF_4d1d3cdc94b4ea3000e27d53888" DEFAULT 0, "order" int NOT NULL CONSTRAINT "DF_e741388a2f671aa520013469f17" DEFAULT 0, "formId" int, CONSTRAINT "PK_5bc5aa86b9da4b82b41726d8126" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_responses" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_62481f29f057942b087c218a30d" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_b1d7c993de471144985935ee5e7" DEFAULT getdate(), "createdBy" int, "value" nvarchar(max) NOT NULL, "questionId" uniqueidentifier, "formResponseId" int, CONSTRAINT "PK_2332645e57b89c7d848b8c866bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "form_responses" ADD CONSTRAINT "FK_8e9a32f15bd2485ea908787b634" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_responses" ADD CONSTRAINT "FK_273348ab1f1af9df94bc0df253c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_question" ADD CONSTRAINT "FK_2072351f9e24ad25ffa22bc93bf" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_responses" ADD CONSTRAINT "FK_98462a19062457955901c16842d" FOREIGN KEY ("questionId") REFERENCES "form_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_responses" ADD CONSTRAINT "FK_4aad9fb347def98085ad347a409" FOREIGN KEY ("formResponseId") REFERENCES "form_responses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_responses" DROP CONSTRAINT "FK_4aad9fb347def98085ad347a409"`);
        await queryRunner.query(`ALTER TABLE "question_responses" DROP CONSTRAINT "FK_98462a19062457955901c16842d"`);
        await queryRunner.query(`ALTER TABLE "form_question" DROP CONSTRAINT "FK_2072351f9e24ad25ffa22bc93bf"`);
        await queryRunner.query(`ALTER TABLE "form_responses" DROP CONSTRAINT "FK_273348ab1f1af9df94bc0df253c"`);
        await queryRunner.query(`ALTER TABLE "form_responses" DROP CONSTRAINT "FK_8e9a32f15bd2485ea908787b634"`);
        await queryRunner.query(`DROP TABLE "question_responses"`);
        await queryRunner.query(`DROP TABLE "form_question"`);
        await queryRunner.query(`DROP TABLE "form"`);
        await queryRunner.query(`DROP TABLE "form_responses"`);
    }

}
