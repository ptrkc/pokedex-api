import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import faker from "faker";

import app, { init } from "../../src/app";
import User from "../../src/entities/User";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";
import Session from "../../src/entities/Session";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await getConnection().close();
});

describe("POST /sign-up", () => {
    it("should answer with status 201 if data is valid", async () => {
        const password = faker.internet.password();
        const user = {
            email: faker.internet.email(),
            password,
            confirmPassword: password,
        };

        const response = await supertest(app).post("/sign-up").send(user);

        const checkDB = await getRepository(User).findOne({
            email: user.email,
        });
        expect(checkDB).not.toBe(undefined);
        expect(response.status).toBe(201);
    });

    it("should answer with status 400 if data is invalid", async () => {
        const user = {
            email: "not_a_valid@email",
            password: faker.internet.password(),
        };

        const response = await supertest(app).post("/sign-up").send(user);
        expect(response.status).toBe(400);
    });

    it("should answer with status 409 if email already in use", async () => {
        const { email, password } = await createUser();
        const user = {
            email,
            password,
            confirmPassword: password,
        };

        const response = await supertest(app).post("/sign-up").send(user);

        expect(response.status).toBe(409);
    });
});

describe("POST /sign-in", () => {
    it("should answer with status 200 and a token", async () => {
        const { email, password } = await createUser();
        const user = {
            email,
            password,
        };

        const response = await supertest(app).post("/sign-in").send(user);

        expect(response.body).toEqual(
            expect.objectContaining({ token: expect.any(String) })
        );
        expect(response.status).toBe(200);
    });

    it("should answer with status 401 if password and email don't match", async () => {
        const { email } = await createUser();
        const user = {
            email,
            password: "wrong_pass",
        };

        const response = await supertest(app).post("/sign-in").send(user);

        expect(response.status).toBe(401);
    });
});
