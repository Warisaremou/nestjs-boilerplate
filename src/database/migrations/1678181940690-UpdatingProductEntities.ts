import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatingProductEntities1678181940690 implements MigrationInterface {
    name = 'UpdatingProductEntities1678181940690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_files" DROP CONSTRAINT "FK_d6143daa56b0a61c160ea9b15c5"`);
        await queryRunner.query(`ALTER TABLE "products_files" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "picture_id" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_136c02f380511a7257e6a2635c3" UNIQUE ("picture_id")`);
        await queryRunner.query(`ALTER TABLE "products_files" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "products_files" ADD "path" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_136c02f380511a7257e6a2635c3" FOREIGN KEY ("picture_id") REFERENCES "products_files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_136c02f380511a7257e6a2635c3"`);
        await queryRunner.query(`ALTER TABLE "products_files" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "products_files" ADD "path" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_136c02f380511a7257e6a2635c3"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "picture_id"`);
        await queryRunner.query(`ALTER TABLE "products_files" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "products_files" ADD CONSTRAINT "FK_d6143daa56b0a61c160ea9b15c5" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
