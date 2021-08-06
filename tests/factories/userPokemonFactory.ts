import { getRepository } from "typeorm";

import UserPokemon from "../../src/entities/UserPokemon";

export async function createUserPokemon(userId: number, pokemonId: number) {
    const userPokemon = await getRepository(UserPokemon).save({
        userId,
        pokemonId,
    });

    return userPokemon;
}
