import { Request, Response } from "express";
import * as userPokemonService from "../services/userPokemonService";
import * as schemas from "../schemas/schemas";
export async function add(req: Request, res: Response) {
    try {
        const error = schemas.id.validate(req.params).error;
        if (error) return res.sendStatus(400);

        const pokemonId = parseInt(req.params.id);
        const addPokemon = await userPokemonService.add(
            res.locals.userId,
            pokemonId
        );
        if (!addPokemon) return res.sendStatus(400);

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
