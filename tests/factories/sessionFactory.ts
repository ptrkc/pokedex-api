import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

export async function createSession(userId: number) {
    const token = uuid();

    const session = await getRepository(Session).save({
        userId,
        token,
    });

    return `Bearer ${token}`;
}
