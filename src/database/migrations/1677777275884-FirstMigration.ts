import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1677777275884 implements MigrationInterface {
    name = 'FirstMigration1677777275884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP CONSTRAINT "FK_b19e573951c831a008fde22890a"`);
        await queryRunner.query(`CREATE TABLE "follow" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "follower_id" integer, "following_id" integer, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b59e2e874b077ea7acf724e4711" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "payment_date" TIMESTAMP NOT NULL, "payment_method" character varying NOT NULL, "transation_details" character varying NOT NULL, "transaction_number" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "paymentStatusId" integer NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "is_delivered" boolean NOT NULL, "is_cancelled" boolean NOT NULL, "shipping_date" TIMESTAMP NOT NULL, "delivery_adress" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "user_id" integer NOT NULL, "payment_id" integer, "order_status" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "total" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "user_id" integer NOT NULL, "product_id" integer NOT NULL, "order_id" integer, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD "product_id" integer`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "socialLink" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_e65ef3268d3d5589f94b09c2373" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_7e66760f06ef2ca5eb43109d1cc" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD CONSTRAINT "FK_2aae74ae69f6a36ff7376bee6ac" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD CONSTRAINT "FK_c6f087eecbc1fa8a1a908a75aaf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_f295f97d26596bd247f54132c93" FOREIGN KEY ("paymentStatusId") REFERENCES "payment_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_176a8cfec69d0e1b0b8387b879f" FOREIGN KEY ("order_status") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_7d0e145ebd287c1565f15114a18" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_ace88a18b5f57ade458db9061d2" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_ace88a18b5f57ade458db9061d2"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_7d0e145ebd287c1565f15114a18"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_176a8cfec69d0e1b0b8387b879f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_f295f97d26596bd247f54132c93"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP CONSTRAINT "FK_c6f087eecbc1fa8a1a908a75aaf"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP CONSTRAINT "FK_2aae74ae69f6a36ff7376bee6ac"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_7e66760f06ef2ca5eb43109d1cc"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_e65ef3268d3d5589f94b09c2373"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "socialLink"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD "productId" integer`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "payment_status"`);
        await queryRunner.query(`DROP TABLE "order_status"`);
        await queryRunner.query(`DROP TABLE "follow"`);
        await queryRunner.query(`ALTER TABLE "products_reviews" ADD CONSTRAINT "FK_b19e573951c831a008fde22890a" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
