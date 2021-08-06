import { Request, Response } from "express";
import * as pokemonService from "../services/pokemonService";

export async function getAll(req: Request, res: Response) {
    try {
        const pokemons = await pokemonService.getAll(res.locals.userId);
        res.send(pokemons);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
