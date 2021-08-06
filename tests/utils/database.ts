import { getConnection } from "typeorm";

export async function clearDatabase() {
    const tables = ["users", "sessions", "pokemons", "user_pokemon"];
    let query = "";
    for (const table of tables) {
        query += `TRUNCATE "${table}" RESTART IDENTITY CASCADE;`;
    }
    await getConnection().query(query);
}
