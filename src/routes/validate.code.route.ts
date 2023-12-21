import express from "express";
import { AllowedSchema } from "express-json-validator-middleware";
import validateCodeController from "../controllers/validate.code.controller";
import { createRouter, validate } from "../utils/functions.utils";


const schema: AllowedSchema = {
    type: "object",
    required: ["code", "email"],
    additionalProperties: false,
    properties: {
        email: {
            type: "string",
            format: "email",
        },
        code: {
            type: "string",
        }
    }
}

const route = express.Router();

route.use(validate({ body: schema }));
route.post('/validate-code', validateCodeController);

const codeValidatorRoute = createRouter('', route);

export default codeValidatorRoute;