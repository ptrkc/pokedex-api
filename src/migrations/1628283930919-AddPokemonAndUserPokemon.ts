import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPokemonAndUserPokemon1628283930919 implements MigrationInterface {
    name = 'AddPokemonAndUserPokemon1628283930919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, "inMyPokemons" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_pokemon" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_24ef932d434bed1275ecc545eaa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_pokemon"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
    }

}
