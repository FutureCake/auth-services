import express from "express";
import * as https from "https";
import { apply_middlewares, configure_defaults } from "./utils/express.utils";

const service = express();
configure_defaults(service);
apply_middlewares(service);

const server = (process.env.NODE_ENV === "prod") ? https.createServer({}, service) : service;

async function launch_service(): Promise<void> {

    server.listen(3000, 'localhost', () => {
        console.log(`launched server @ ${'localhost'}:${3000}`);
    });
}

launch_service();