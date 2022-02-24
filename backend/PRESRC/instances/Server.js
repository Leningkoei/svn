import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

export default class Server {
    /* private */ constructor() {
        this.#server = express();

        this.#server.use(bodyParser.json());
        this.#server.use(bodyParser.urlencoded({
            extended: true
        }));
        this.#server.use(cors());
    };

    static #INSTANCE = null;

    static initialize = () => {
        if (Server.#INSTANCE === null) {
            Server.#INSTANCE = new Server();
        } else {
            console.log("[Warning] [Server] Server has been initialized!");
        };
    };
    static getServer = () => {
        if (Server.#INSTANCE === null) {
            throw new Error("[Error] [Server] Server must be initialize!");
        } else {
            return Server.#INSTANCE.#server
        };
    };

    #server = null;
};

