import Directory from "./Directory.js";

export default class User {
    constructor(id, name, password, rootDirectory) {
        this.#id = id;
        this.#name = name;
        this.#password = password;
        this.#rootDirectory = rootDirectory;
    };

    #id = null;
    #name = null;
    #password = null;
    #rootDirectory = null;

    getId = () => this.#id;
    getName = () => this.#name;
    getPassword = () => this.#password;
    getRootDirectory = () => this.#rootDirectory;

    static importAttributes = attributes => new User(
        attributes._id,
        attributes.name,
        attributes.password,
        Directory.importAttributes(attributes.rootDirectory)
    );

    exportAttributes = () => ({
        name: this.#name,
        password: this.#password,
        rootDirectory: this.#rootDirectory.exportAttributes()
    });
};

