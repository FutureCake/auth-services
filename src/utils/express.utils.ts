import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import emailRouter from "../routes/email.auth.route";

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
}

// function set_default_error_responses(app: Application) {
//     app.use(handle_auth_error);
//     app.use(handle_schema_validation_error);
//     app.use(handle_generic_error);
//     app.use(handle_invalid_path);
// }

export { applyMiddlewares, configureDefaults, setRoutes };

