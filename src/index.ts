import express from "express";
import * as https from "https";
import config from "./configs/configurator";
import connectMYSQL from "./utils/db.utils";
import { applyMiddlewares, configureDefaults, setRoutes } from "./utils/express.utils";

const service = express();
configureDefaults(service);
applyMiddlewares(service);
setRoutes(service);

const server = (config.get('env') === "production") ? https.createServer({}, service) : service;

async function launch_service(): Promise<void> {

    const ip = config.get('server.host');
    const port = config.get('server.port');

    connectMYSQL();

    server.listen(port, ip, () => {
        console.log(`launched server @ ${ip}:${port}`);
    });
}

launch_service();
