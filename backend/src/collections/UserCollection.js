import Database from "../instances/Database.js";

export default class UserCollection {
    constructor() {
        this.#database = Database.get().getDatabase();
    };

    #database = null;

    // C;
    createUser = async user => {
        const collection = this.#getCollection();
        const document = user.get();
        const result = await collection.insertOne(document);

        user.addInsertIdAsId(resultId.insertedId);

        console.log(
            "[Log] [Collection] [UserCollection] [Insert] " +
            user.stringify()
        );
    };

    // R;

    // U;

    // D;

    #getCollection = () => this.#database.collection("User");
};

