import { NextFunction, Request, Response } from 'express';
import emailConfirmCode from '../utils/email.utils';

interface RequestData {
    email: string;
}

async function login(req: Request<any, any, RequestData>, res: Response, next: NextFunction): Promise<void> {

    const { email } = req.body;

    emailConfirmCode(email, 12345);
}

async function register(req: Request<any, any, RequestData>, res: Response, next: NextFunction): Promise<void> {

    const { email } = req.body;

    emailConfirmCode(email, 12345);
}

async function quick(req: Request<any, any, RequestData>, res: Response, next: NextFunction): Promise<void> {

    const { email } = req.body;

    emailConfirmCode(email, 12345);
}

export {
    login, quick, register
};
