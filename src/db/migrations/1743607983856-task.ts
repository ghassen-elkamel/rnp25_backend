import { MigrationInterface, QueryRunner } from "typeorm";

export class Task1743607983856 implements MigrationInterface {
    name = 'Task1743607983856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "timeStart" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "task" ADD "isExpandable" bit NOT NULL CONSTRAINT "DF_79ad6d64bb156432b552b830162" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD "isCompleted" bit NOT NULL CONSTRAINT "DF_4a8e8eb051810d078be940743aa" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD "timeStart" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD "timeEnd" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "subtask" ALTER COLUMN "durationMinutes" int`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtask" ALTER COLUMN "durationMinutes" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP COLUMN "timeEnd"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP COLUMN "timeStart"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "DF_4a8e8eb051810d078be940743aa"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "DF_79ad6d64bb156432b552b830162"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "isExpandable"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "timeStart"`);
    }

}
