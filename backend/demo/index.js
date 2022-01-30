import Server from "./instances/Server.js";
import Database from "./instances/Database.js";
import FileReceiver from "./api/FileReceiver.js";

class SVN {
    constructor() {
        console.log("[Log] [Main] Preparing backend server...");
    };

    #initializes = async () => {
        Server.initialize();
        await Database.initialize();
    };
    #setListeners = () => {
        (new FileReceiver({
            destination: "./files",
            fieldname: "file",
            url: "/server/file-receiver"
        })).setFileReceiverListener("post");

        Server.get().getServer().listen(1024, () => {
            console.log(
                "[Log] [Main] " +
                "Backend server is running at http://127.0.0.1:1024/server."
            );
        });
    };

    main = async () => {
        await this.#initializes();

        this.#setListeners();
    };
};

(new SVN).main();

