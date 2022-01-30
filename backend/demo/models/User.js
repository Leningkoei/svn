export default User {
    constructor(name) {
        this.#name = name;
        this.#root = {
            id: "jdfkaljfdak",
            type: "directory",
            path: [ "root" ],
            fold: false,
            children: []
        };
    };

    #id = null;
    #name = null;
    #root = null;

    setInsertedIdAsId = insertedId => this.#id = insertedId;
    get = () => {
        const user = {
            name: this.#name,
            root: this.#root
        };

        this.#id && user.id = this.#id;

        return user;
    };
    stringify = () => (
        "id: " + this.#id + ", " +
        "name: " + this.#name + ", " +
        "root: " + this.#root
    );
};

