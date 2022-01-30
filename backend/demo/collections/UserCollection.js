import Database from "../instances/Database.js";

export default class UserCollection {
    constructor() {
        this.#database = Database.get().getDatabase();
        this.#collection = this.#database.collection("User");
    };

    #database = null;
    #collection = null;

    // C;
    createUser = async user => {
        const document = user.get();
        const result = await this.#collection.insertOne(document);

        user.setInsertIdAsId(result.insertedId);

        console.log(
            "[Log] [Collection] [UserCollection] [Insert] " +
            user.stringify()
        );
    };

    // R;
    readRootFromId = async id => {
        const collection = this.#getCollection();
        const query = {
            _id: id
        };
        const options = {};

        return await this.#collection.findOne(query, options).root;
    };

    // U;

    // D;
};

