import Token from "../Token.js";
import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";
import Directory from "../models/Directory.js";
import User from "../models/User.js";

export default class SignUp {
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

                const samenameUser =
                    await this.#userCollection.readUserByName(name);

                if (samenameUser) {
                    res.send({ result: false, msg: "Failed" })
                    return;
                };

                const password = req.body.password;

                const rootDirectory =
                    new Directory("root", false, [ "root" ], []);
                const user = new User(null, name, password, rootDirectory);
                const id = await this.#userCollection.createUser(user);

                const token = Token.create(id);

                res.send({ result: true, token });
            }
        );

        console.log(
            "[Log] [Main] [Listener] " +
            `Sign Up listener has listening ${this.#url}.`
        );
    };
};

