import Server from "../instances/Server.js";
import UserCollection from "../collections/UserCollection.js";
import Directory from "../models/Directory.js";
import User from "../models/User.js";

export default class SignUp {
    constructor(method, url) {
        this.#server = Server.getServer();
        this.#userCollection = new UserCollection();

        this.#method = method;
        this.#url = url;
    };

    #server = null;
    #userCollection = null;

    #method = null;
    #url = null;

    setListener = () => {
        this.#server[this.#method](
            this.#url,
            async (req, res) => {
                const name = req.body.name;

                if (await this.#userCollection.isNewName(name)) {
                    const password = req.body.password;
                    const rootDirectory =
                        new Directory("root", false, [ "root" ], []);
                    const user = new User(null, name, password, rootDirectory);
                    const result = await this.#userCollection.createUser(user);

                    res.send({
                        result,
                        msg: result ? "Successed." : "Failed"
                    });
                } else {
                    res.send({
                        result: false,
                        msg: "Name has been used!"
                    });
                };
            }
        );
    };
};

