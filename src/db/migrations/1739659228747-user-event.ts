import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEvent1739659228747 implements MigrationInterface {
    name = 'UserEvent1739659228747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_3145bb3b1f11a4b680a8cd4f2a5"`);
        await queryRunner.query(`EXEC sp_rename "DB_RNP25_LOCAL.dbo.user_event.usersId", "userId"`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_77452fe8443c349b0e628507cbb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_77452fe8443c349b0e628507cbb"`);
        await queryRunner.query(`EXEC sp_rename "DB_RNP25_LOCAL.dbo.user_event.userId", "usersId"`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_3145bb3b1f11a4b680a8cd4f2a5" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
