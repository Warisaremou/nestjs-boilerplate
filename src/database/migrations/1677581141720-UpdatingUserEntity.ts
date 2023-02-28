import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatingUserEntity1677581141720 implements MigrationInterface {
    name = 'UpdatingUserEntity1677581141720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "socialLink" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "shipping_date" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "shipping_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "socialLink"`);
    }

}
