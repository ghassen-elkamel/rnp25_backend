import { MigrationInterface, QueryRunner } from "typeorm";

export class Task1742340701796 implements MigrationInterface {
    name = 'Task1742340701796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "pathPicture" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "task" ADD "location" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "pathPicture"`);
    }

}
