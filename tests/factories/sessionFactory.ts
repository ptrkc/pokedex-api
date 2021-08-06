import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

export async function createSession(user: User) {
    const token = uuid();

    const session = await getRepository(Session).save({
        user,
        token,
    });

    return session;
}
