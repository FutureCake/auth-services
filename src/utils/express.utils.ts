import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

function apply_middlewares(app: Application): void {
    app.use(cors());
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(express.json());
}

function configure_defaults(app: Application): void {
    app.disable('x-powered-by');
}

// function set_default_error_responses(app: Application) {
//     app.use(handle_auth_error);
//     app.use(handle_schema_validation_error);
//     app.use(handle_generic_error);
//     app.use(handle_invalid_path);
// }

export { apply_middlewares, configure_defaults };

