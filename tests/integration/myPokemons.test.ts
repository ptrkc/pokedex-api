import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { createPokemon } from "../factories/pokemonFactory";
import { createSession } from "../factories/sessionFactory";
import { createUserPokemon } from "../factories/userPokemonFactory";
import { clearDatabase } from "../utils/database";
import UserPokemon from "../../src/entities/UserPokemon";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await getConnection().close();
});

describe("post /my-pokemons/:id/add", () => {
    it("should answer with status 200 add pokemon to user", async () => {
        const user = await createUser();
        const token = await createSession(user.id);
        const pokemon = await createPokemon();

        const response = await supertest(app)
            .post(`/my-pokemons/${pokemon.id}/add`)
            .set("Authorization", token);

        const pokemonAdded = await getRepository(UserPokemon).find();
        expect(pokemonAdded.length).toEqual(1);
        expect(response.status).toBe(200);
    });

    it("should answer with status 400 if user already has pokemon", async () => {
        const user = await createUser();
        const token = await createSession(user.id);
        const pokemon = await createPokemon();
        await createUserPokemon(user.id, pokemon.id);

        const response = await supertest(app)
            .post(`/my-pokemons/${pokemon.id}/add`)
            .set("Authorization", token);

        expect(response.status).toBe(400);
    });

    it("should answer with status 401 if no token provided", async () => {
        const response = await supertest(app).post(`/my-pokemons/1/add`);

        expect(response.status).toBe(401);
    });
});
