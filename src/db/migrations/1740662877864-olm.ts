import { MigrationInterface, QueryRunner } from "typeorm";

export class Olm1740662877864 implements MigrationInterface {
    name = 'Olm1740662877864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "olm" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_75beb81db6da7e299d044b0b6ee" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ef79541b3516e045fc4fa36c785" DEFAULT getdate(), "zone" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_c92e5b9563c1bfb73baa925a8b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD CONSTRAINT "FK_98bdfa667d8037c5673a023fd35" FOREIGN KEY ("olmId") REFERENCES "olm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP CONSTRAINT "FK_98bdfa667d8037c5673a023fd35"`);
        await queryRunner.query(`DROP TABLE "olm"`);
    }

}
