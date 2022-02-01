import multer from "multer";
import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";
import File from "../models/File.js";
import User from "../models/User.js";

export default class FileReceiver {
    constructor(method, url, fieldname, destination) {
        this.#server = Server.getServer();
        this.#userCollection = new UserCollection();

        this.#method = method;
        this.#url = url;
        this.#fieldname = fieldname;
        this.#destination = destination;
    };

    #server = null;
    #userCollection = null;

    #method = null;
    #url = null;
    #fieldname = null;
    #destination = null;

    setListener = () => {
        const upload = multer({
            dest: this.#destination
        });

        this.#server[this.#method](
            this.#url,
            upload.single(this.#fieldname),
            async (req, res) => {
                const username = req.data.username;
                const user =
                    await this.#userCollection.readUserByName(username);
                const originalname = req.file.originalname;
                const filename = req.file.filename;
                const path = req.data.path;
                const file = new File(originalname, filename, path);

                await this.#userCollection.addFileForUser(user, file);

                res.send(user.holder);
            }
        );
    };
};

