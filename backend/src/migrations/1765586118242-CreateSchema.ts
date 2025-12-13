import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchema1765586118242 implements MigrationInterface {
    name = 'CreateSchema1765586118242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tournaments_status_enum" AS ENUM('upcoming', 'active', 'ended')`);
        await queryRunner.query(`CREATE TABLE "tournaments" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "prize" character varying NOT NULL, "participants" integer NOT NULL DEFAULT '0', "maxParticipants" integer NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "status" "public"."tournaments_status_enum" NOT NULL DEFAULT 'upcoming', "game" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6d5d129da7a80cf99e8ad4833a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament_participants" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "tournamentId" integer NOT NULL, "joinedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_833b6390f9db43bbdc04c7a5fb5" UNIQUE ("userId", "tournamentId"), CONSTRAINT "PK_89ff15f4f125bcab7f5531dd501" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."bonuses_type_enum" AS ENUM('welcome', 'no-deposit', 'first-deposit', 'vip-welcome', 'vip-cashback', 'vip-birthday', 'daily-cashback', 'daily-spins', 'weekend')`);
        await queryRunner.query(`CREATE TYPE "public"."bonuses_category_enum" AS ENUM('welcome', 'vip', 'daily')`);
        await queryRunner.query(`CREATE TABLE "bonuses" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "amount" character varying NOT NULL, "type" "public"."bonuses_type_enum" NOT NULL, "category" "public"."bonuses_category_enum" NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "terms" text NOT NULL, "icon" character varying NOT NULL, "color" character varying NOT NULL, "additionalProperties" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_70d172c5a1bbe261fe01ff591fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bonus_claims" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "bonusId" integer NOT NULL, "claimedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0ce24dcd175f61a3bc642638691" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "balance" numeric(10,2) NOT NULL DEFAULT '0', "isVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jackpots" ("id" SERIAL NOT NULL, "gameId" integer NOT NULL, "amount" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78c90d8fc3d435d5b89e7120086" UNIQUE ("gameId"), CONSTRAINT "REL_78c90d8fc3d435d5b89e712008" UNIQUE ("gameId"), CONSTRAINT "PK_6f03c06195673b400d3dc7b09ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "image" character varying NOT NULL, "jackpot" character varying, "isHot" boolean NOT NULL DEFAULT false, "providerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "providers" ("id" character varying NOT NULL, "name" character varying NOT NULL, "logo" character varying NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tournament_participants" ADD CONSTRAINT "FK_20f6afe853b176ef4c59eded448" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournament_participants" ADD CONSTRAINT "FK_dd7f9ba71e65bcd4b61b014ad42" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bonus_claims" ADD CONSTRAINT "FK_b5a451d7ad894e775fc09405be6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bonus_claims" ADD CONSTRAINT "FK_db0858c8ad0325c38624c7c80a4" FOREIGN KEY ("bonusId") REFERENCES "bonuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jackpots" ADD CONSTRAINT "FK_78c90d8fc3d435d5b89e7120086" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_c25af2c3527eb259aedb1b68054" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_c25af2c3527eb259aedb1b68054"`);
        await queryRunner.query(`ALTER TABLE "jackpots" DROP CONSTRAINT "FK_78c90d8fc3d435d5b89e7120086"`);
        await queryRunner.query(`ALTER TABLE "bonus_claims" DROP CONSTRAINT "FK_db0858c8ad0325c38624c7c80a4"`);
        await queryRunner.query(`ALTER TABLE "bonus_claims" DROP CONSTRAINT "FK_b5a451d7ad894e775fc09405be6"`);
        await queryRunner.query(`ALTER TABLE "tournament_participants" DROP CONSTRAINT "FK_dd7f9ba71e65bcd4b61b014ad42"`);
        await queryRunner.query(`ALTER TABLE "tournament_participants" DROP CONSTRAINT "FK_20f6afe853b176ef4c59eded448"`);
        await queryRunner.query(`DROP TABLE "providers"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TABLE "jackpots"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bonus_claims"`);
        await queryRunner.query(`DROP TABLE "bonuses"`);
        await queryRunner.query(`DROP TYPE "public"."bonuses_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."bonuses_type_enum"`);
        await queryRunner.query(`DROP TABLE "tournament_participants"`);
        await queryRunner.query(`DROP TABLE "tournaments"`);
        await queryRunner.query(`DROP TYPE "public"."tournaments_status_enum"`);
    }

}
