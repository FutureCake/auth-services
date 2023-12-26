import mysql, { PoolOptions } from "mysql2/promise";
import config from "../configs/configurator";

let db: mysql.Pool;

function connectMYSQL(options?: PoolOptions) {
    if (db === undefined || db === null) {

        const socketPath: PoolOptions = config.get("env") != "production" ? { socketPath: config.get("mysql.socketPath") } : {};

        try {
            db = mysql.createPool({
                connectionLimit: 25,
                host: config.get("mysql.host"),
                user: config.get("mysql.user"),
                password: config.get("mysql.password"),
                database: config.get("mysql.database"),
                ...socketPath,
                ...options
            });
        } catch (error) {
            console.error("failed to connect to db ", error);
            process.exitCode = 2;
        }
    }

    return db;
}

export default connectMYSQL;