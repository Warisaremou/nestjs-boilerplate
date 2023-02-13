import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOrder1676291348011 implements MigrationInterface {
    name = 'UpdateOrder1676291348011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_37b50c6e3b13ecaf98e4306c2d7"`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "payment_date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "shipping_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "delivery_adress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "delivery_method" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_176a8cfec69d0e1b0b8387b879f" FOREIGN KEY ("order_status") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_176a8cfec69d0e1b0b8387b879f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_status"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "delivery_method"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "delivery_adress"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shipping_date"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "statusId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_37b50c6e3b13ecaf98e4306c2d7" FOREIGN KEY ("statusId") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
