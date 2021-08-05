import { Request, Response } from "express";
import * as schemas from "../schemas/schemas";
import * as userService from "../services/userService";

export async function createUser(req: Request, res: Response) {
    try {
        const error = schemas.signUp.validate(req.body).error;
        if (error) {
            return res.sendStatus(400);
        }
        const user = await userService.createUser(req.body);
        if (!user) {
            return res.sendStatus(409);
        }
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
