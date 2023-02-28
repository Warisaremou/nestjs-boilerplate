import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingPaymentStatusEntity1677596505918 implements MigrationInterface {
    name = 'AddingPaymentStatusEntity1677596505918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b59e2e874b077ea7acf724e4711" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "payment_method" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "transation_details" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "transaction_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "paymentStatusId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "is_delivered" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "is_cancelled" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "payment_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_f295f97d26596bd247f54132c93" FOREIGN KEY ("paymentStatusId") REFERENCES "payment_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_f295f97d26596bd247f54132c93"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "payment_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "is_cancelled"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "is_delivered"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "paymentStatusId"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transaction_number"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "transation_details"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_method"`);
        await queryRunner.query(`DROP TABLE "payment_status"`);
    }

}
