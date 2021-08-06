import { getRepository } from "typeorm";
import faker from "faker";
faker.locale = "pt_BR";

import Pokemon from "../../src/entities/Pokemon";

export async function createPokemon() {
    const pokemon = await getRepository(Pokemon).save({
        name: faker.name.firstName(),
        number: Math.floor(Math.random() * 100 + 1),
        image: faker.image.animals(),
        weight: Math.floor(Math.random() * 100 + 1),
        height: Math.floor(Math.random() * 100 + 1),
        baseExp: Math.floor(Math.random() * 100 + 1),
        description: faker.commerce.productDescription(),
    });

    return pokemon;
}
