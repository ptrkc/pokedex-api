import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import faker from "faker";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { createPokemon } from "../factories/pokemonFactory";
import { createSession } from "../factories/sessionFactory";
import { createUserPokemon } from "../factories/userPokemonFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await getConnection().close();
});

describe("GET /pokemons", () => {
    it("should answer with status 200 and (user) pokemons array", async () => {
        const user = await createUser();
        const token = await createSession(user.id);
        const pokemon = await createPokemon();
        await createPokemon();
        await createUserPokemon(user.id, pokemon.id);

        const response = await supertest(app)
            .get("/pokemons")
            .set("Authorization", token);

        expect(response.body[0].inMyPokemons).toBe(true);
        expect(response.body[1].inMyPokemons).toBe(false);
        expect(response.status).toBe(200);
    });

    it("should answer with status 401 if no token provided", async () => {
        const response = await supertest(app).get("/pokemons");

        expect(response.status).toBe(401);
    });
});
