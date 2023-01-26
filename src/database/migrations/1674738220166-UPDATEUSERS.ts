import {MigrationInterface, QueryRunner} from "typeorm";

export class UPDATEUSERS1674738220166 implements MigrationInterface {
    name = 'UPDATEUSERS1674738220166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }

}
