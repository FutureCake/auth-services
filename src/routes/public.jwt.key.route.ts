import express from "express";
import { AllowedSchema } from "express-json-validator-middleware";
import publicJWTkeyController from "../controllers/public.jwt.key.controller";
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
route.post('/public-jwt-key', publicJWTkeyController);

const publicJWTKeyRoute = createRouter('', route);

export default publicJWTKeyRoute;