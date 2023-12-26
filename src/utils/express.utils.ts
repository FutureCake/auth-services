import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import emailRouter from "../routes/email.auth.route";
import publicJWTKeyRoute from "../routes/public.jwt.key.route";
import codeValidatorRoute from "../routes/validate.code.route";
import { handleInvalidPath, handleSchemaError, handleServiceError } from "./error.utils";

function applyMiddlewares(app: Application): void {
    app.use(cors());
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(express.json());
}

function configureDefaults(app: Application): void {
    app.disable('x-powered-by');
}

function setRoutes(app: Application) {
    app.use(emailRouter.path, emailRouter.router);
    app.use(codeValidatorRoute.path, codeValidatorRoute.router);
    app.use(publicJWTKeyRoute.path, publicJWTKeyRoute.router);
}

function setErrorHandlers(app: Application) {
    app.use(handleSchemaError);
    app.use(handleServiceError);
    app.use(handleInvalidPath);    
}

export { applyMiddlewares, configureDefaults, setErrorHandlers, setRoutes };

