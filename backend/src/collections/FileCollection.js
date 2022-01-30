import Database from "../instances/Database.js";

export default class FileCollection {
    constructor() {
        this.#database = Database.getDatabase();
        this.#collection = this.#database.collection("File");
    };

    #database = null;
    #collection = null;

    // C;
    createFile = async file => {
        const originalname = file.getOriginalname();
        const filename = file.getFilename();
        const type = file.getType();
        const fold = file.getFold();
        const path = file.getPath();
        const childIds = file.getChildIds();
        const document = {
            originalname, filename, type, fold, path, childIds
        };
        const result = await this.#collection.insertOne(document);
    };

    // R;

    // U;

    // D;
};

