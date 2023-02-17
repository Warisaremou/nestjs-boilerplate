import {MigrationInterface, QueryRunner} from "typeorm";

export class NewUpdateOrder1676457407703 implements MigrationInterface {
    name = 'NewUpdateOrder1676457407703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "delivery_method"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "delivery_method" character varying NOT NULL`);
    }

}
