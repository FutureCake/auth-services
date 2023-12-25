import { NextFunction, Request, Response } from "express";
import getPublicJWTKey from "../services/public.jwt.key.service";

async function publicJWTkeyController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.status(200).json({
            key: getPublicJWTKey()
        });
    } catch (error) {
        next(error);
    }
}

export default publicJWTkeyController;