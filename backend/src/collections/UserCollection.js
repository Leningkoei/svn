import Database from "../instances/Database.js";

export default class UserCollection {
    constructor() {
        this.#database = Database.getDatabase();
    };

    #database = null;

    #getCollection = () => this.#database.collection("User");

    // C;
    createUser = async user => {
        const collection = this.#getCollection();

        const name = user.name;

        if (await this.isNewName(name)) {
            const directory = user.directory;
            const document = { name, directory };

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
            const id = result._id;
            const name = result.name;
            const password = result.password;
            const rootDirectory = result.rootDirectory;

            return new User(id, name, password, rootDirectory);
        } else {
            return undefined;
        };
    };
    readRootDirectoryById = async id => {
        const collection = this.#getCollection();

        const query = { _id: id };
        const options = {};
        const rootDirectory =
            await collection.findOne(query, options).rootDirectory;

        return rootDirectory;
    };

    // U;
    addFileForUser = async (user, file) => {
        const collection = this.#getCollection();
        const id = user.getId();
        const rootDirectory = user.getDirectory();
        const originalname = file.getOriginalname();
        const filename = file.getFilename();
        const path = file.getPath();

        let currentDirectory = rootDirectory;
        for (
            const path = [ ...file.path].reverse();
            path.length != 1;
            currentDirectory = currentDirectory.children[path.pop()]
        );
        currentDirectory.children.push({ originalname, filename, path });

        const query = { _id: id };
        const content = { $set: { rootDirectory } };

        await collection.updateOne(query, content);
    };

    // D;
};

