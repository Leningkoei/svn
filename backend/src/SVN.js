import Database from "./instances/Database.js";
import Server from "./instances/Server.js";
import FileReceiver from "./api/FileReceiver.js";
import SignUp from "./api/SignUp.js";

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
        const fileReceiver = new FileReceiver("post", "/server/file-receiver",
            "file", "./files");
        const signUp = new SignUp("post", "/server/sign-up");

        fileReceiver.setListener();
        signUp.setListener();
    };

    main = async () => {
        await this.#initialize();
        this.#setServer();
        this.#setListeners();
    };
};

