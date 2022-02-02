import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";

export default class ChangeFold {
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
                const path = req.query.path;

                const user = await this.#userCollection.readUserByName(name);
                const rootDirectory = user.getRootDirectory();
                const currentDirectory = rootDirectory.getCurrentObject(path);

                currentDirectory.changeFold();
                await this.#userCollection.updateUser(user);

                res.send(rootDirectory.exportAttributes());
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Change Fold listener has listening ${this.#url}.`
        );
    };
};

