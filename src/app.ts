import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
// import * as pokemonController from "./controllers/pokemonController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.createUser);

// app.post("/sign-in", userController.createSession);

// app.get("/pokemons", authMiddleware, pokemonController.get);

// app.post("/my-pokemons/:id/add", authMiddleware, pokemonController.add);

// app.get("/my-pokemons/:id/remove", authMiddleware, pokemonController.remove);

export async function init() {
    await connectDatabase();
}

export default app;
