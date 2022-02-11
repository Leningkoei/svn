import Token from "../Token.js";
import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";
import Directory from "../models/Directory.js";

export default class CreateDirectory {
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
            Token.middleware,
            async (req, res) => {
                const user = req.user;

                const dirname = req.query.dirname;
                const path = req.query.path;

                const rootDirectory = user.getRootDirectory();
                const currentDirectory = rootDirectory.getCurrentObject(path);

                if (
                    currentDirectory.getType() == "directory" &&
                    currentDirectory.getName() != dirname
                ) {
                    const directory = new Directory(dirname, false, path, []);

                    currentDirectory.addChild(directory);

                    const task = this.#userCollection.updateUser(user);

                    res.send({
                        result: true,
                        rootDirectory:
                            user.getRootDirectory().exportAttributes()
                    });
                    await task;
                } else {
                    res.send({
                        result: false,
                        msg: "This directory has been existed!"
                    });
                };
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Create Directory listener has listening ${this.#url}.`
        );
    };
};

