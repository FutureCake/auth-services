import { NextFunction, Request, Response } from "express";
import codeValidatorService from "../services/validate.code.service";

interface RequestData {
    email: string;
    code: string;
}

async function validateCodeController(req: Request<any, any, RequestData>, res: Response, next: NextFunction) {
    const {code, email } = req.body;

    try {
        res.json(await codeValidatorService(email, code));
    } catch (error) {
        next(error);
    }
}

export default validateCodeController;