import Token from "../Token.js";
import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";

export default class DeleteDirectory {
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
                const user = req.user;
                const path = req.query.path;

                const rootDirectory = user.getRootDirectory();
                const currentDirectory = rootDirectory.getCurrentObject(path);

                currentDirectory.deleteIt();

                await this.#userCollection.updateUser(user);

                res.send(rootDirectory.exportAttributes());
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Delete Directory listener has listening ${this.#url}.`
        );
    };
};

