import { NextFunction, Request, Response } from 'express';
import { emailLoginService } from '../services/email.auth.service';

interface RequestData {
    email: string;
}

async function login(req: Request<any, any, RequestData>, res: Response, next: NextFunction): Promise<void> {

    try {
        // CHECK: see if we need to do additional things here.
        res.status(200).json(await emailLoginService(req.body.email));
    } catch (error) {
        next(error);
    }
}

async function register(req: Request<any, any, RequestData>, res: Response, next: NextFunction): Promise<void> {

    const { email } = req.body;

    // emailConfirmCode(email, 12345);
}

async function quick(req: Request<any, any, RequestData>, res: Response, next: NextFunction): Promise<void> {

    const { email } = req.body;

    // emailConfirmCode(email, 12345);
}

export {
    login, quick, register
};
