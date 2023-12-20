import { ValidationError } from "ajv";
import { NextFunction, Request, Response } from "express";

class ServiceError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ServiceError.prototype);
    }
}

function handleSchemaError(error: ValidationError, req: Request, res: Response, next: NextFunction) { 
    if(error instanceof ValidationError) {
        res.status(422).send({msg: "your request contained an unprocessable entity"});
    } else {
        next(error);
    }
}

function handleServiceError(error: ServiceError, req: Request, res: Response, next: NextFunction) {
    if(error instanceof ServiceError) {
        res.status(500).send({msg: "something went wrong in the process"});
    }
}

function handleInvalidPath(req: Request, res: Response) {
    res.status(404).send({
        msg: "this endpoint was not found",
    });
}

export { ServiceError, handleInvalidPath, handleSchemaError, handleServiceError };

