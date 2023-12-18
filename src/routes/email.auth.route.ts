import express from "express";
import { AllowedSchema } from "express-json-validator-middleware";
import * as emailAuthController from "../controllers/email.auth.controller";
import { createRouter, validate } from "../utils/functions.utils";

const schema: AllowedSchema = {
    type: "object",
    required: ["email"],
    additionalProperties: false,
    properties: {
        email: {
            type: "string",
            format: "email",
        }
    }
}

const route = express.Router();

route.use(validate({body: schema}));

route.post('/login',  emailAuthController.login);
route.post('/register', emailAuthController.register);
route.post('/quick-access', emailAuthController.quick);

const emailRouter = createRouter('/email', route);

export default emailRouter;