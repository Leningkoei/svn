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
            Token.mindware,
            async (req, res) => {
                const name = req.user.getName();
                const dirname = req.query.dirname;
                const path = req.query.path;

                const user = await this.#userCollection.readUserByName(name);
                const directory = new Directory(dirname, false, path, []);

                const rootDirectory = user.getRootDirectory();
                const currentDirectory = rootDirectory.getCurrentObject(path);

                currentDirectory.addChild(directory);

                const task = this.#userCollection.updateUser(user);

                res.send(user.getRootDirectory().exportAttributes());
                await task;
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Create Directory listener has listening ${this.#url}.`
        );
    };
};

