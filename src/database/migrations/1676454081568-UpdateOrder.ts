import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOrder1676454081568 implements MigrationInterface {
    name = 'UpdateOrder1676454081568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    }

}
