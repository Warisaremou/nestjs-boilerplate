import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatingReviewsEntity1675300340454 implements MigrationInterface {
    name = 'UpdatingReviewsEntity1675300340454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD CONSTRAINT "FK_c6f087eecbc1fa8a1a908a75aaf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP CONSTRAINT "FK_c6f087eecbc1fa8a1a908a75aaf"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP COLUMN "user_id"`);
    }

}
