import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";

export default class FoldChanger {
    /*
     * config = {
     *     url: "/server/fold-changer"
     * };
     */
    constructor(config) {
        this.#server = Server.get().getServer();
        this.#userCollection = new UserCollection();

        this.#url = config.url;
    };

    #server = null;
    #userCollection = null;

    #url = null;

    setFoldChangerListener = method => {
        this.#server[method](
            this.#url,
            async (req, res) => {
                console.log("[Log] [Access] FoldChangerListener is accessed.");

            }
        );

        console.log("[Log] [Listener] FoldChanger has been prepard.");
    };
};

