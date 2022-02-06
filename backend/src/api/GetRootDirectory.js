import Token from "../Token.js";
import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";

export default class GetRootDirectory {
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

                res.send(user.getRootDirectory().exportAttributes());
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Get Root Directory listener has listening ${this.#url}.`
        );
    };
};

