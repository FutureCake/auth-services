import express from "express";
import * as https from "https";
import config from "./configs/configurator";
import connectMYSQL from "./utils/db.utils";
import connectEmail from "./utils/email.utils";
import { applyMiddlewares, configureDefaults, setErrorHandlers, setRoutes } from "./utils/express.utils";

type Express = typeof express.application;

interface AuthorizeServiceOptions {
    
}

class AuthorizeService<T extends AuthorizeServiceOptions = AuthorizeServiceOptions> {

    private service: Express;
    private server: Express | https.Server;

    constructor(options: T) {
        this.service = express();
        this.server = this.createServer();
    }

    private createServer(): Express | https.Server {
        
        // TODO: set default https options here
        const options: https.ServerOptions = {};

        return (config.get('env') === "production") ? https.createServer(options, this.service) : this.service
    }

    public setup(): void {
        configureDefaults(this.service);
        applyMiddlewares(this.service);
        setRoutes(this.service);
        setErrorHandlers(this.service);
    }

    public async launch(): Promise<void> {

        const ip = config.get('server.host');
        const port = config.get('server.port');

        connectMYSQL();
        connectEmail();

        this.server.listen(port, ip, () => {
            console.log(`launched server @ ${ip}:${port}`);
        });
    }
}

export default AuthorizeService;
