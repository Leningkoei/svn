import { ObjectId } from "mongodb";
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

        const { id, ...document } = user.exportAttributes();

        const result = await collection.insertOne(document);

        return result.insertedId.toString();
    };

    // R;
    readUserById = async id => {
        const collection = this.#getCollection();

        const query = { _id: new ObjectId(id) };
        const options = {};

        const result = await collection.findOne(query, options);

        if (result) {
            return User.importAttributes(result);
        } else {
            return undefined;
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

