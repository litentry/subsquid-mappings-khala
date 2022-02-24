module.exports = class Data1645448663983 {
  name = 'Data1645448663983'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_crowdloan" ("id" character varying NOT NULL, "depositor" text NOT NULL, "verifier" text, "cap" numeric NOT NULL, "raised" numeric NOT NULL, "lock_expired_block" integer NOT NULL, "block_number" integer, "first_slot" integer NOT NULL, "last_slot" integer NOT NULL, "status" text NOT NULL, "lease_expired_block" integer, "dissolved_block" integer, "updated_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE, "is_finished" boolean, "won_auction_id" text, "parachain_id" character varying NOT NULL, CONSTRAINT "PK_84ab399973e4fd400d65b3fbfe1" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_862501801829e69c01cb023707" ON "substrate_crowdloan" ("parachain_id") `)
    await db.query(`CREATE INDEX "IDX_10d47cf374d31dfe35b7a95174" ON "substrate_crowdloan" ("raised") `)
    await db.query(`CREATE INDEX "IDX_313069bfc22c8345dd92d95590" ON "substrate_crowdloan" ("status") `)
    await db.query(`CREATE INDEX "IDX_859719af0ef807d47d57f8cdee" ON "substrate_crowdloan" ("is_finished") `)
    await db.query(`CREATE INDEX "IDX_29c2c61b2210c5ab03595a192c" ON "substrate_crowdloan" ("won_auction_id") `)
    await db.query(`CREATE TABLE "substrate_bid" ("id" character varying NOT NULL, "winning_auction" integer, "block_number" integer NOT NULL, "is_crowdloan" boolean NOT NULL, "amount" numeric NOT NULL, "decimals" integer NOT NULL, "symbol" text NOT NULL, "first_slot" integer NOT NULL, "last_slot" integer NOT NULL, "bidder" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "auction_id" character varying NOT NULL, "parachain_id" character varying NOT NULL, "fund_id" character varying, CONSTRAINT "PK_dfcd3adbee00eedf50f83682993" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_b3429e8acec5cec8d849983837" ON "substrate_bid" ("auction_id") `)
    await db.query(`CREATE INDEX "IDX_1c890bca0bcca0edc9250ff9e2" ON "substrate_bid" ("winning_auction") `)
    await db.query(`CREATE INDEX "IDX_17b9db2b90c95fec8db0b31435" ON "substrate_bid" ("block_number") `)
    await db.query(`CREATE INDEX "IDX_06e76ada472fa79740bc301a47" ON "substrate_bid" ("parachain_id") `)
    await db.query(`CREATE INDEX "IDX_219989f51f91276ce4daa75038" ON "substrate_bid" ("fund_id") `)
    await db.query(`CREATE TABLE "substrate_auction" ("id" character varying NOT NULL, "auction_id" integer NOT NULL, "network" character varying(8) NOT NULL, "block_number" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "status" text NOT NULL, "lease_start" integer, "slots_start" integer NOT NULL, "lease_end" integer, "slots_end" integer NOT NULL, "closing_start" integer NOT NULL, "closing_end" integer NOT NULL, "result_block" integer, "ongoing" boolean NOT NULL, CONSTRAINT "PK_6a2af159f92b9b9882d0f12fb51" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_9bcb7adeeae5e4d18e868ef6d2" ON "substrate_auction" ("auction_id") `)
    await db.query(`CREATE INDEX "IDX_bc18df06e87873906f30114993" ON "substrate_auction" ("network") `)
    await db.query(`CREATE INDEX "IDX_a2578208994f155bf43cd3b5b4" ON "substrate_auction" ("status") `)
    await db.query(`CREATE INDEX "IDX_984ffe1b3956b9c621fa6c5a57" ON "substrate_auction" ("ongoing") `)
    await db.query(`CREATE TABLE "substrate_parachain_leases" ("id" character varying NOT NULL, "para_id" integer NOT NULL, "lease_range" text NOT NULL, "first_lease" integer NOT NULL, "last_lease" integer NOT NULL, "latest_bid_amount" numeric NOT NULL, "active_for_auction" text, "winning_amount" numeric, "extra_amount" numeric, "won_bid_from" text, "num_block_won" integer, "winning_result_block" integer, "has_won" boolean NOT NULL, "parachain_id" character varying NOT NULL, "auction_id" character varying, CONSTRAINT "PK_0ce65647b2dedba210543c46cb7" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_336507ffead100174b586dbedd" ON "substrate_parachain_leases" ("parachain_id") `)
    await db.query(`CREATE INDEX "IDX_0495a02d6f290b3f05bfa67a7d" ON "substrate_parachain_leases" ("lease_range") `)
    await db.query(`CREATE INDEX "IDX_d469400f9e3acf9047649683ab" ON "substrate_parachain_leases" ("auction_id") `)
    await db.query(`CREATE INDEX "IDX_489bdd25ba5030fb93876a1fd1" ON "substrate_parachain_leases" ("active_for_auction") `)
    await db.query(`CREATE INDEX "IDX_8a5f06993f0182bbae0b193c3f" ON "substrate_parachain_leases" ("has_won") `)
    await db.query(`CREATE TABLE "substrate_auction_chronicle" ("id" character varying NOT NULL, "cur_block_number" integer, "cur_lease" integer, "cur_lease_start" integer, "cur_lease_end" integer, "cur_auction_id" character varying, CONSTRAINT "PK_d0cd5080771de174c7e0c0dcf4b" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_6b3f0a46e4d94f34afeef3fa3d" ON "substrate_auction_chronicle" ("cur_auction_id") `)
    await db.query(`CREATE TABLE "substrate_parachain" ("id" character varying NOT NULL, "para_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "creation_block" integer NOT NULL, "deregistered" boolean NOT NULL, "deposit" numeric NOT NULL, "manager" text NOT NULL, "chronicle_id" character varying, CONSTRAINT "PK_affcbca43be5a76a312df92d626" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_f429235f40d5b655b62db773a5" ON "substrate_parachain" ("chronicle_id") `)
    await db.query(`CREATE TABLE "substrate_crowdloan_contribution" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "root_account" text NOT NULL, "para_id" integer NOT NULL, "amount" numeric NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "block_number" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "account_id" character varying NOT NULL, "parachain_id" character varying NOT NULL, "fund_id" character varying NOT NULL, CONSTRAINT "PK_0bfe0fa389d5c77fe86af6e2020" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_24c59a6f405f99ff54ef5eb9fc" ON "substrate_crowdloan_contribution" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_f4eacbe3132d59eec5ac98a3bc" ON "substrate_crowdloan_contribution" ("root_account") `)
    await db.query(`CREATE INDEX "IDX_485dca5d945d4403ce9279a3c1" ON "substrate_crowdloan_contribution" ("parachain_id") `)
    await db.query(`CREATE INDEX "IDX_5a678bc818ce02eca223316605" ON "substrate_crowdloan_contribution" ("fund_id") `)
    await db.query(`CREATE INDEX "IDX_4f6686dc262136b7a736385ac7" ON "substrate_crowdloan_contribution" ("amount") `)
    await db.query(`CREATE INDEX "IDX_2bd7ebb5e825f96bbf852c3414" ON "substrate_crowdloan_contribution" ("block_number") `)
    await db.query(`CREATE TABLE "substrate_crowdloan_contribution_account" ("id" character varying NOT NULL, "root_account" text NOT NULL, "network" character varying(8) NOT NULL, "total_crowdloan_contributions" integer NOT NULL, CONSTRAINT "PK_24c59a6f405f99ff54ef5eb9fce" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_8c36082a7f0734207c731855da" ON "substrate_crowdloan_contribution_account" ("root_account") `)
    await db.query(`CREATE TABLE "substrate_auction_parachain" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "first_slot" integer NOT NULL, "last_slot" integer NOT NULL, "auction_id" character varying NOT NULL, "parachain_id" character varying NOT NULL, CONSTRAINT "PK_c30ea7052e06a753705129ab4a8" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_4bdb9a61672505070e68528fb7" ON "substrate_auction_parachain" ("auction_id") `)
    await db.query(`CREATE INDEX "IDX_98ab3de71ec4c224b1eaaa9082" ON "substrate_auction_parachain" ("parachain_id") `)
    await db.query(`CREATE TABLE "substrate_crowdloan_sequence" ("id" character varying NOT NULL, "cur_index" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, CONSTRAINT "PK_fa14b6e3f49591337cdcb7107c7" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "substrate_crowdloan" ADD CONSTRAINT "FK_862501801829e69c01cb0237075" FOREIGN KEY ("parachain_id") REFERENCES "substrate_parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_bid" ADD CONSTRAINT "FK_b3429e8acec5cec8d8499838378" FOREIGN KEY ("auction_id") REFERENCES "substrate_auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_bid" ADD CONSTRAINT "FK_06e76ada472fa79740bc301a470" FOREIGN KEY ("parachain_id") REFERENCES "substrate_parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_bid" ADD CONSTRAINT "FK_219989f51f91276ce4daa750387" FOREIGN KEY ("fund_id") REFERENCES "substrate_crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_parachain_leases" ADD CONSTRAINT "FK_336507ffead100174b586dbedd5" FOREIGN KEY ("parachain_id") REFERENCES "substrate_parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_parachain_leases" ADD CONSTRAINT "FK_d469400f9e3acf9047649683abf" FOREIGN KEY ("auction_id") REFERENCES "substrate_auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_auction_chronicle" ADD CONSTRAINT "FK_6b3f0a46e4d94f34afeef3fa3dd" FOREIGN KEY ("cur_auction_id") REFERENCES "substrate_auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_parachain" ADD CONSTRAINT "FK_f429235f40d5b655b62db773a54" FOREIGN KEY ("chronicle_id") REFERENCES "substrate_auction_chronicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD CONSTRAINT "FK_24c59a6f405f99ff54ef5eb9fce" FOREIGN KEY ("account_id") REFERENCES "substrate_crowdloan_contribution_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD CONSTRAINT "FK_485dca5d945d4403ce9279a3c1d" FOREIGN KEY ("parachain_id") REFERENCES "substrate_parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD CONSTRAINT "FK_5a678bc818ce02eca2233166056" FOREIGN KEY ("fund_id") REFERENCES "substrate_crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_auction_parachain" ADD CONSTRAINT "FK_4bdb9a61672505070e68528fb7e" FOREIGN KEY ("auction_id") REFERENCES "substrate_auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_auction_parachain" ADD CONSTRAINT "FK_98ab3de71ec4c224b1eaaa9082f" FOREIGN KEY ("parachain_id") REFERENCES "substrate_parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_crowdloan"`)
    await db.query(`DROP INDEX "public"."IDX_862501801829e69c01cb023707"`)
    await db.query(`DROP INDEX "public"."IDX_10d47cf374d31dfe35b7a95174"`)
    await db.query(`DROP INDEX "public"."IDX_313069bfc22c8345dd92d95590"`)
    await db.query(`DROP INDEX "public"."IDX_859719af0ef807d47d57f8cdee"`)
    await db.query(`DROP INDEX "public"."IDX_29c2c61b2210c5ab03595a192c"`)
    await db.query(`DROP TABLE "substrate_bid"`)
    await db.query(`DROP INDEX "public"."IDX_b3429e8acec5cec8d849983837"`)
    await db.query(`DROP INDEX "public"."IDX_1c890bca0bcca0edc9250ff9e2"`)
    await db.query(`DROP INDEX "public"."IDX_17b9db2b90c95fec8db0b31435"`)
    await db.query(`DROP INDEX "public"."IDX_06e76ada472fa79740bc301a47"`)
    await db.query(`DROP INDEX "public"."IDX_219989f51f91276ce4daa75038"`)
    await db.query(`DROP TABLE "substrate_auction"`)
    await db.query(`DROP INDEX "public"."IDX_9bcb7adeeae5e4d18e868ef6d2"`)
    await db.query(`DROP INDEX "public"."IDX_bc18df06e87873906f30114993"`)
    await db.query(`DROP INDEX "public"."IDX_a2578208994f155bf43cd3b5b4"`)
    await db.query(`DROP INDEX "public"."IDX_984ffe1b3956b9c621fa6c5a57"`)
    await db.query(`DROP TABLE "substrate_parachain_leases"`)
    await db.query(`DROP INDEX "public"."IDX_336507ffead100174b586dbedd"`)
    await db.query(`DROP INDEX "public"."IDX_0495a02d6f290b3f05bfa67a7d"`)
    await db.query(`DROP INDEX "public"."IDX_d469400f9e3acf9047649683ab"`)
    await db.query(`DROP INDEX "public"."IDX_489bdd25ba5030fb93876a1fd1"`)
    await db.query(`DROP INDEX "public"."IDX_8a5f06993f0182bbae0b193c3f"`)
    await db.query(`DROP TABLE "substrate_auction_chronicle"`)
    await db.query(`DROP INDEX "public"."IDX_6b3f0a46e4d94f34afeef3fa3d"`)
    await db.query(`DROP TABLE "substrate_parachain"`)
    await db.query(`DROP INDEX "public"."IDX_f429235f40d5b655b62db773a5"`)
    await db.query(`DROP TABLE "substrate_crowdloan_contribution"`)
    await db.query(`DROP INDEX "public"."IDX_24c59a6f405f99ff54ef5eb9fc"`)
    await db.query(`DROP INDEX "public"."IDX_f4eacbe3132d59eec5ac98a3bc"`)
    await db.query(`DROP INDEX "public"."IDX_485dca5d945d4403ce9279a3c1"`)
    await db.query(`DROP INDEX "public"."IDX_5a678bc818ce02eca223316605"`)
    await db.query(`DROP INDEX "public"."IDX_4f6686dc262136b7a736385ac7"`)
    await db.query(`DROP INDEX "public"."IDX_2bd7ebb5e825f96bbf852c3414"`)
    await db.query(`DROP TABLE "substrate_crowdloan_contribution_account"`)
    await db.query(`DROP INDEX "public"."IDX_8c36082a7f0734207c731855da"`)
    await db.query(`DROP TABLE "substrate_auction_parachain"`)
    await db.query(`DROP INDEX "public"."IDX_4bdb9a61672505070e68528fb7"`)
    await db.query(`DROP INDEX "public"."IDX_98ab3de71ec4c224b1eaaa9082"`)
    await db.query(`DROP TABLE "substrate_crowdloan_sequence"`)
    await db.query(`ALTER TABLE "substrate_crowdloan" DROP CONSTRAINT "FK_862501801829e69c01cb0237075"`)
    await db.query(`ALTER TABLE "substrate_bid" DROP CONSTRAINT "FK_b3429e8acec5cec8d8499838378"`)
    await db.query(`ALTER TABLE "substrate_bid" DROP CONSTRAINT "FK_06e76ada472fa79740bc301a470"`)
    await db.query(`ALTER TABLE "substrate_bid" DROP CONSTRAINT "FK_219989f51f91276ce4daa750387"`)
    await db.query(`ALTER TABLE "substrate_parachain_leases" DROP CONSTRAINT "FK_336507ffead100174b586dbedd5"`)
    await db.query(`ALTER TABLE "substrate_parachain_leases" DROP CONSTRAINT "FK_d469400f9e3acf9047649683abf"`)
    await db.query(`ALTER TABLE "substrate_auction_chronicle" DROP CONSTRAINT "FK_6b3f0a46e4d94f34afeef3fa3dd"`)
    await db.query(`ALTER TABLE "substrate_parachain" DROP CONSTRAINT "FK_f429235f40d5b655b62db773a54"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP CONSTRAINT "FK_24c59a6f405f99ff54ef5eb9fce"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP CONSTRAINT "FK_485dca5d945d4403ce9279a3c1d"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP CONSTRAINT "FK_5a678bc818ce02eca2233166056"`)
    await db.query(`ALTER TABLE "substrate_auction_parachain" DROP CONSTRAINT "FK_4bdb9a61672505070e68528fb7e"`)
    await db.query(`ALTER TABLE "substrate_auction_parachain" DROP CONSTRAINT "FK_98ab3de71ec4c224b1eaaa9082f"`)
  }
}