import { MigrationInterface, QueryRunner } from "typeorm";

export class Country2691566967379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM country;`);
    const items = await queryRunner.manager
      .query(`INSERT INTO country (id, name, nameSecondary,nameThird, countryCode, phoneCountryCode) VALUES 
        (1,  N'ليبيا', 'Libya', 'Libya', 'LY', '218')
        ;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`country\``);
  }
}
