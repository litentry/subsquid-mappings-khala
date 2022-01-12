const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class transfers1642017049789 {
    name = 'transfers1642017049789'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "khala_transfer" ("id" character varying NOT NULL, "amount" numeric NOT NULL, "block_number" numeric NOT NULL, "timestamp" numeric NOT NULL, "to_id" character varying NOT NULL, "from_id" character varying NOT NULL, CONSTRAINT "PK_f3eca77ae60ba245cd372afdcae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea6c3577b762f892cd3cdf3a90" ON "khala_transfer" ("to_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc6084b5a71cc87332cb2724ae" ON "khala_transfer" ("from_id") `);
        await queryRunner.query(`CREATE TABLE "khala_account" ("id" character varying NOT NULL, "first_transfer_in_timestamp" numeric, "first_transfer_in_block_number" numeric, "first_transfer_out_timestamp" numeric, "first_transfer_out_block_number" numeric, "last_transfer_in_timestamp" numeric, "last_transfer_in_block_number" numeric, "last_transfer_out_timestamp" numeric, "last_transfer_out_block_number" numeric, CONSTRAINT "PK_6a84ada8a8007cf1c833d3b4f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "khala_transfer" ADD CONSTRAINT "FK_ea6c3577b762f892cd3cdf3a902" FOREIGN KEY ("to_id") REFERENCES "khala_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "khala_transfer" ADD CONSTRAINT "FK_dc6084b5a71cc87332cb2724aee" FOREIGN KEY ("from_id") REFERENCES "khala_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "khala_transfer" DROP CONSTRAINT "FK_dc6084b5a71cc87332cb2724aee"`);
        await queryRunner.query(`ALTER TABLE "khala_transfer" DROP CONSTRAINT "FK_ea6c3577b762f892cd3cdf3a902"`);
        await queryRunner.query(`DROP TABLE "khala_account"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc6084b5a71cc87332cb2724ae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea6c3577b762f892cd3cdf3a90"`);
        await queryRunner.query(`DROP TABLE "khala_transfer"`);
    }
}