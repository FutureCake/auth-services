import { NextFunction, Request, Response } from 'express';
import { loginService } from '../services/email.auth.service';

interface RequestData {
    email: string;
}

async function login(req: Request<any, any, RequestData>, res: Response, next: NextFunction): Promise<void> {

    const { email } = req.body;
    loginService(email);

    // emailConfirmCode(email, 12345);
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
