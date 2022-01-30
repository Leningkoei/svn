export default User {
    constructor(id, name, password, holder) {
        this.#id = id;
        this.#name = name;
        this.#holder = holder;
    };

    #id = null;
    #name = null;
    #password = null;
    #holder = null;

    getId = () => this.#id;
    getName = () => this.#name;
    getPassword = () => this.#password;
    getHolder = () => this.#holder;
};

