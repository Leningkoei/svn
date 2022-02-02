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
            async (req, res) => {
                const name = req.query.name;
                const dirname = req.query.dirname;
                const path = req.query.path;

                const user = await this.#userCollection.readUserByName(name);
                const directory = new Directory(dirname, false, path, []);

                await this.#userCollection.addObjectForUser(user, directory);

                res.send(user.getRootDirectory().exportAttributes());
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Create Directory listener has listening ${this.#url}.`
        );
    };
};

