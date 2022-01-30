import Database from "../instances/Database.js";

export default class UserCollection {
    constructor() {
        this.#database = Database.getDatabase();
        this.#collection = this.#database.collection("User");
    };

    #database = null;
    #collection = null;

    // C;
    createUser = async user => {
        const name = user.name;
        const directory = user.directory;
        const document = { name, directory };

        this.#collection.insertOne(document);
    };

    // R;
    readHolderById = async id => {
        const query = { _id: id };
        const options = {};
        const holder = await this.#collection.findOne(query, options).holder;

        return holder;
    };

    // U;
    addFileForUser = async (user, file) => {
        const userId = user.id;
        const holder = user.holder;
        const id = file.getId();
        const originalname = file.getOriginalname();
        const filename = file.getFilename();
        const path = file.getPath();

        // const pathKai = [ ...file.path ].reverse();
        let currentDirectory = holder;
        // while(path.length != 1) {
        //     currentDirectory = currentDirectory[pathKai.pop()];
        // };
        for (
            const path = [ ...file.path].reverse();
            path.length != 1;
            currentDirectory = currentDirectory.children[path.pop()];
        );
        currentDirectory.children.push({ id, originalname, filename, path });

        const query = { _id: userId };
        const content = { $set: { holder } };

        await this.#collection.updateOne(query, content);
    };

    // D;
};

