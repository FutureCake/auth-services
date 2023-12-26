import express from "express";
import * as https from "https";
import { PoolOptions } from "mysql2";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import config, { loadConfigParameters } from "./configs/configurator";
import connectMYSQL from "./utils/db.utils";
import connectEmail from "./utils/email.utils";
import { applyMiddlewares, configureDefaults, setErrorHandlers, setRoutes } from "./utils/express.utils";

type Express = typeof express.application;

interface AuthorizeServiceOptions {
    config?: {
        env?: string;
        authentication?: {
            jwtToken?: {
                private?: string;
                public?: string;
            };
        };
        server?: {
            port?: number;
            host?: string;
            options?: {
                key?: string;
                cert?: string;
            };
        };
        email?: {
            host?: string;
            port?: number;
            user?: string;
            pass?: string;
        };
        mysql?: {
            host?: string;
            port?: number;
            user?: string;
            pass?: string;
            database?: string;
            socketPath?: string;
        };
    }
    mysqlOptions?: PoolOptions;
    emailOptions?: SMTPTransport.Options;
    serverOptions?: https.ServerOptions;
}

class AuthorizeService {

    private service: Express;
    private server: Express | https.Server;
    private options?: AuthorizeServiceOptions;

    constructor(options?: AuthorizeServiceOptions) {

        if (options && options.config) loadConfigParameters(options.config);

        this.options = options;
        this.service = express();
        this.server = this.createServer();
    }

    private createServer(): Express | https.Server {
        const serverOptions = this.options?.serverOptions ?? {};
        return (config.get('env') === "production") ? https.createServer(serverOptions, this.service) : this.service;
    }

    public setup(): AuthorizeService {
        configureDefaults(this.service);
        applyMiddlewares(this.service);
        setRoutes(this.service);
        setErrorHandlers(this.service);

        return this;
    }

    public async launch(): Promise<void> {

        const ip = config.get('server.host');
        const port = config.get('server.port');

        connectMYSQL(this.options?.mysqlOptions );
        connectEmail(this.options?.emailOptions);

        this.server.listen(port, ip, () => {
            console.log(`launched server @ ${ip}:${port}`);
        });
    }
}

// CHECK: for testing purposes... not sure how to do this better atm;
new AuthorizeService().setup().launch();

export default AuthorizeService;
export type { AuthorizeServiceOptions };
