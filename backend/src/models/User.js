export default class User {
    constructor(id, name, password, rootDirectory) {
        this.#id = id;
        this.#name = name;
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
};

