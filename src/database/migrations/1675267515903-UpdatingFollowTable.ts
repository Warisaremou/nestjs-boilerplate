import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatingFollowTable1675267515903 implements MigrationInterface {
    name = 'UpdatingFollowTable1675267515903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_e7695b93fb2699c5c5934f495a5"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_adbaf6505ee64392e6b3fc7ed42"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followings_id"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followers_id"`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "follower_id" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "following_id" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_e65ef3268d3d5589f94b09c2373" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_7e66760f06ef2ca5eb43109d1cc" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_7e66760f06ef2ca5eb43109d1cc"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_e65ef3268d3d5589f94b09c2373"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "following_id"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "follower_id"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followers_id" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followings_id" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_adbaf6505ee64392e6b3fc7ed42" FOREIGN KEY ("followings_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_e7695b93fb2699c5c5934f495a5" FOREIGN KEY ("followers_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
