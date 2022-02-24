import JWT from "jsonwebtoken";
import UserCollection from "./collections/UserCollection.js";

export default class Token {
    static #optionStr = "cnpnmslsb";

    static create = id => JWT.sign({ id }, Token.#optionStr);
    static middleware = async (req, res, next) => {
        const userCollection = new UserCollection();

        const token = req.headers.authorization.split(" ")[1];
        const tokenData = JWT.verify(token, Token.#optionStr);
        const id = tokenData.id;

        const user = await userCollection.readUserById(id);

        if (user) {
            req.user = user;

            next();
        } else {
            res.send({ result: false, msg: "Token ????" });
        };
    };
    static getUserByToken = async token => {
        const userCollection = new UserCollection();

        const tokenData = JWT.verify(token, Token.#optionStr);
        const id = tokenData.id;

        return await userCollection.readUserById(id);
    };
};

