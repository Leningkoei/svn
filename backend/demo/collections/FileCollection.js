import Database from "../instances/Database.js";

export default class FileCollection {
    constructor() {
        this.#database = Database.get().getDatabase();
        this.#collection = this.#database.collection("File");
    };

    #database = null;
    #collection = null;

    // C;
    createFile = async file => {
        const document = file.get();
        const result = await this.#collection.insertOne(document);

        file.setInsertedIdAsId(result.insertedId);
    };

    // R;

    // U;

    // D;
};

