import multer from "multer";
import Token from "../Token.js";
import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";
import File from "../models/File.js";
import User from "../models/User.js";

export default class UploadFile {
    constructor(url, fieldname, destination) {
        this.#server = Server.getServer();
        this.#userCollection = new UserCollection();

        this.#url = url;
        this.#fieldname = fieldname;
        this.#destination = destination;
    };

    #server = null;
    #userCollection = null;

    #url = null;
    #fieldname = null;
    #destination = null;

    setListener = () => {
        const upload = multer({
            dest: this.#destination
        });

        this.#server.post(
            this.#url,
            Token.middleware,
            upload.single(this.#fieldname),
            async (req, res) => {
                const user = req.user;

                const originalname = req.file.originalname;
                const filename = req.file.filename;
                const path = req.body.path.split(",");

                const file = new File(originalname, filename, path);

                const rootDirectory = user.getRootDirectory();
                const currentDirectory = rootDirectory.getCurrentObject(path);

                if (currentDirectory.getType() == "directory") {
                    currentDirectory.addChild(file);

                    const task = this.#userCollection.updateUser(user);

                    res.send({
                        result: true,
                        rootDirectory:
                            user.getRootDirectory().exportAttributes()
                    });
                    await task;
                } else {
                    file.deleteIt();

                    res.send({
                        result: false,
                        msg: "This file has been exist!"
                    });
                };
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Upload File listener has listening ${this.#url}.`
        );
    };
};

