import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";
import UserPokemon from "../entities/UserPokemon";

export async function add(userId: number, pokemonId: number) {
    const pokemon = await getRepository(Pokemon).findOne({ id: pokemonId });
    if (!pokemon) return false;

    const alreadyAdded = await getRepository(UserPokemon).findOne({
        userId,
        pokemonId,
    });

    if (alreadyAdded) return false;

    await getRepository(UserPokemon).save({ userId, pokemonId });

    return true;
}

export async function remove(userId: number, pokemonId: number) {
    const pokemon = await getRepository(Pokemon).findOne({ id: pokemonId });
    if (!pokemon) return false;

    const hasPokemon = await getRepository(UserPokemon).findOne({
        userId,
        pokemonId,
    });

    if (!hasPokemon) return false;

    await getRepository(UserPokemon).delete({ id: hasPokemon.id });

    return true;
}
