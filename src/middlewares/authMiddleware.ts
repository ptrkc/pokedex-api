import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Session from "../entities/Session";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) return res.sendStatus(401);

        const token = authorization.split("Bearer ")[1];
        if (!token) return res.sendStatus(401);

        const session = await getRepository(Session).findOne({ token });
        if (!session) return res.sendStatus(401);

        res.locals.userId = session.userId;

        return next();
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}
