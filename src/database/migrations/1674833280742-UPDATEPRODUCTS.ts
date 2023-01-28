import {MigrationInterface, QueryRunner} from "typeorm";

export class UPDATEPRODUCTS1674833280742 implements MigrationInterface {
    name = 'UPDATEPRODUCTS1674833280742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "sellerId" TO "seller_id"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "seller_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_425ee27c69d6b8adc5d6475dcfe" FOREIGN KEY ("seller_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_425ee27c69d6b8adc5d6475dcfe"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "seller_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "seller_id" TO "sellerId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
