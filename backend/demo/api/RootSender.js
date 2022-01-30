import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";

export default class RootSender {
    constructor(url) {
        this.#server = Server.get().getServer();

        this.#url = url;
    };

    #server = null;

    #url = null;

    setRootSenderListener = method => {
        this.#server[method](
            this.#url,
            async (req, res) => {
                const data = this.req.params;
                const userId = data.userId;
                const userCollection = new UserCollection();
                const root = userCollection.readRootFromId(userId);

                res.send(root);
            };
        );
    };
};

