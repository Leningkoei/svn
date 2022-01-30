import Database from "../instances/Database.js";

export default class FileMap {
    constructor() {
        this.#database = Database.get().getDatabase();
    };

    #database = null;

    // C;
    createFileMap = async fileMapItem => {
        const collection = this.#getCollection();
        const document = fileMapItem.get();
        const result = await collection.insertOne(document);

        fileMapItem.addInsertedIdAsId(result.insertedId);

        console.log(
            "[Log] [Collection] [FileMap] [Insert] " +
            fileMapItem.stringify()
        );

        return fileMapItem;
    };

    // R;
    readFilenameFromOriginalname = async originalname => {
        const collection = this.#database.collection("FileMap");
        const query = {
            originalname: originalname
        };
        const options = {
        };
        const filename = await fileMap.findOne(query, options).filename;

        return filename;
    };

    // U;

    // D;

    #getCollection = () => this.#database.collection("FileMap");
};

