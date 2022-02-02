import Database from "../instances/Database.js";
import User from "../models/User.js";

export default class UserCollection {
    constructor() {
        this.#database = Database.getDatabase();
    };

    #database = null;

    #getCollection = () => this.#database.collection("User");

    // C;
    createUser = async user => {
        const collection = this.#getCollection();

        const name = user.getName();

        if (await this.isNewName(name)) {
            const { id, ...document } = user.exportAttributes();

            await collection.insertOne(document);

            return true;
        } else {
            return false;
        };
    };

    // R;
    isNewName = async name => {
        const collection = this.#getCollection();

        const user = await this.readUserByName(name);

        if (user) {
            return false;
        } else {
            return true;
        };
    };
    readUserByName = async name => {
        const collection = this.#getCollection();

        const query = { name };
        const options = {};
        const result = await collection.findOne(query, options);

        if (result) {
            return User.importAttributes(result);
        } else {
            return undefined;
        };
    };

    // U;
    updateUser = async user => {
        const collection = this.#getCollection();

        const id = user.getId();

        const query = { _id: id };
        const content = { $set: user.exportAttributes() };

        await collection.updateOne(query, content);
    };

    // D;
};

