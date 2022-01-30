export default User {
    constructor(name) {
        this.#name = name;
        this.#holder = {
            id: "jdfkaljfdak",
            type: "directory",
            path: [ "root" ],
            fold: false,
            children: []
        };
    };

    #id = null;
    #holder = null;
    #name = null;

    addInsertedIdAsId = insertedId => this.#id = insertedId;
    get = () => {
        const user = {
            holder: this.#holder,
            name: this.#name
        };

        this.#id && user.id = this.#id;

        return user;
    };
    stringify = () => (
        "id: " + this.#id + ", " +
        "name: " + this.#name + ", " +
        "holder: " + this.#holder
    );
};

