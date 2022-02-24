import Token from "../Token.js";
import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";

export default class SignIn {
    constructor(url) {
        this.#server = Server.getServer();
        this.#userCollection = new UserCollection();

        this.#url = url;
    };

    #server = null;
    #userCollection = null;

    #url = null;

    setListener = () => {
        this.#server.post(
            this.#url,
            async (req, res) => {
                const name = req.body.name;

                const user = await this.#userCollection.readUserByName(name);

                if (!user) {
                    res.send({ result: false, msg: "Name wrong." });
                    return;
                };

                const password = req.body.password;

                if (user.getPassword() != password) {
                    res.send({ result: false, msg: "Password wrong." })
                    return;
                };

                const id = user.getId();
                const token = Token.create(id);

                res.send({ result: true, content: token });
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Sign In listener has listening ${this.#url}.`
        );
    };
};

