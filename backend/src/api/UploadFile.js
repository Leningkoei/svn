import multer from "multer";
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
            async (req, res) => {
                const name = req.name;
                const user = await this.#userCollection.readUserByName(name);
                const originalname = req.file.originalname;
                const filename = req.file.filename;
                const path = req.path;
                const file = new File(originalname, filename, path);
                const userKai =
                    await this.#userCollection.addObjectForUser(user, file);

                res.send(userKai.rootDirectory.exportAttributes());
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Upload File listener has listening ${this.#url}.`
        );
    };
};

