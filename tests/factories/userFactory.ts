import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import faker from "faker";
import bcrypt from "bcrypt";
faker.locale = "pt_BR";

export async function createUser() {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await getRepository(User).save({
        email,
        password: hashedPassword,
    });

    return { id: user.id, email, password };
}
