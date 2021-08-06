import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import { authMiddleware } from "./middlewares/authMiddleware";
import * as pokemonController from "./controllers/pokemonController";
import * as userPokemonController from "./controllers/userPokemonController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.get("/pokemons", authMiddleware, pokemonController.getAll);

app.post("/my-pokemons/:id/add", authMiddleware, userPokemonController.add);

// app.get("/my-pokemons/:id/remove", authMiddleware, pokemonController.remove);

export async function init() {
    await connectDatabase();
}

export default app;
