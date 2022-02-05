import path from "path";
import Token from "../Token.js";
import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";

export default class DownloadFile {
    constructor(url) {
        this.#server = Server.getServer();
        this.#userCollection = new UserCollection();

        this.#url = url;
    };

    #server = null;
    #userCollection = null;

    #url = null;

    setListener = () => {
        this.#server.get(
            this.#url,
            async (req, res) => {
                const token = req.query.token;
                const originalpath = req.query.path;
                const originalname = req.query.originalname;

                const user = await Token.getUserByToken(token);
                const rootDirectory = user.getRootDirectory();
                const currentFile = rootDirectory.getCurrentObject(originalpath);

                const filename = currentFile.getFilename();
                const filepath = path.resolve("files", filename);

                res.download(filepath, originalname);
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Download File listener has listening ${this.#url}.`
        );
    };
};

