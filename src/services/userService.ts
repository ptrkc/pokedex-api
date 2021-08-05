import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";

export async function createUser(newUser: User) {
    const checkEmail = await getRepository(User).find({ email: newUser.email });
    if (checkEmail.length) {
        return false;
    }

    const hashedPassword = bcrypt.hashSync(newUser.password, 10);

    const user = await getRepository(User).save({
        email: newUser.email,
        password: hashedPassword,
    });

    return user;
}
