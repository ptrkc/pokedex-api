import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import User from "../entities/User";
import Session from "../entities/Session";

export async function createUser(newUser: User) {
    const checkEmail = await getRepository(User).findOne({
        email: newUser.email,
    });
    if (checkEmail) return false;

    const hashedPassword = bcrypt.hashSync(newUser.password, 10);

    const user = await getRepository(User).save({
        email: newUser.email,
        password: hashedPassword,
    });

    return user;
}

export async function signIn(signInInput: User) {
    const user = await getRepository(User).findOne({
        email: signInInput.email,
    });
    if (!user) return false;

    const rightPassword = bcrypt.compareSync(
        signInInput.password,
        user.password
    );
    if (!rightPassword) return false;

    const token = uuid();

    await getRepository(Session).save({
        user,
        token,
    });

    return { token };
}
