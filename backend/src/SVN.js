import Database from "./instances/Database.js";
import Server from "./instances/Server.js";

export default class SVN {
    constructor(port) {
        console.log("[Log] [Main] Preparing backend server...");

        this.#port = port;
    };

    #port = null;

    #initialize = async () => {
        Server.initialize();
        await Database.initialize();
    };
    #setServer = () => {
        Server.getServer().listen(this.#port, () => {
            console.log(
                "[Log] [Main] " +
                "Backend server is running at " +
                `http://127.0.0.1:${this.#port}/server.`
            );
        });
    };
    #setListeners = () => {
    };

    main = async () => {
        await this.#initialize();
        this.#setServer();
        this.#setListeners();
    };
};

