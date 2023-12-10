import express from "express";

const service = express();

const server = (process.env.NODE_ENV === "prod") ? https.createServer({}, service) : service;

async function launch_service() {

    server.listen(3000, 'localhost', () => {
        console.log(`launched server @ ${'localhost'}:${3000}`);
    });
}

launch_service();