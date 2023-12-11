import formatsPlugin from "ajv-formats";
import { Validator } from "express-json-validator-middleware";
import nodemailer from "nodemailer";
import config from "../configs/configurator";

const validator = new Validator({strict: true});
formatsPlugin(validator.ajv);
const validate = validator.validate;

const transporter = nodemailer.createTransport({
    host: config.get("email.host"),
    port: config.get("email.port"),
    auth: {
        user: config.get("email.user"),
        pass: config.get("email.pass"),
    }
});

export { transporter, validate };
