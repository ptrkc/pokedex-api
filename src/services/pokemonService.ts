import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";
import UserPokemon from "../entities/UserPokemon";

export async function getAll(userId: number) {
    const pokemons = await getRepository(Pokemon).find({
        order: {
            id: "ASC",
        },
    });
    const userPokemons = await getRepository(UserPokemon).find({ userId });
    userPokemons.forEach((p) => {
        pokemons[p.pokemonId - 1].inMyPokemons = true;
    });

    return pokemons;
}
