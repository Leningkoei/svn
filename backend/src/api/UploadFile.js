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
            upload.single(this.#fieldname),
            Token.mindware,
            async (req, res) => {
                const name = req.user.getName();
                const originalname = req.file.originalname;
                const filename = req.file.filename;
                const path = req.body.path.split(",");

                const user = await this.#userCollection.readUserByName(name);
                const file = new File(originalname, filename, path);

                const rootDirectory = user.getRootDirectory();
                const currentDirectory = rootDirectory.getCurrentObject(path);

                currentDirectory.addChild(file);

                const task = this.#userCollection.updateUser(user);

                res.send(user.getRootDirectory().exportAttributes());
                await task;
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Upload File listener has listening ${this.#url}.`
        );
    };
};

