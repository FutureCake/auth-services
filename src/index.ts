import express from "express";
import * as https from "https";
import config from "./configs/configurator";
import { apply_middlewares, configure_defaults } from "./utils/express.utils";

const service = express();
configure_defaults(service);
apply_middlewares(service);

const server = (config.get('env') === "production") ? https.createServer({}, service) : service;

async function launch_service(): Promise<void> {

    const ip = config.get('server.host');
    const port = config.get('server.port');

    server.listen(port, ip, () => {
        console.log(`launched server @ ${ip}:${port}`);
    });
}

launch_service();
