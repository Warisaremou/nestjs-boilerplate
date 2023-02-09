import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatingReviews1675848194149 implements MigrationInterface {
    name = 'UpdatingReviews1675848194149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP CONSTRAINT "FK_c6f087eecbc1fa8a1a908a75aaf"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD CONSTRAINT "FK_c6f087eecbc1fa8a1a908a75aaf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP CONSTRAINT "FK_c6f087eecbc1fa8a1a908a75aaf"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD CONSTRAINT "FK_c6f087eecbc1fa8a1a908a75aaf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
