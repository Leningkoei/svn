export default File {
    constructor(name, type, fold, path) {
        this.#name = name;
        this.#type = type;
        this.#fold = fold;
        this.#path = path;
    };

    #id = null;
    #name = null;
    #type = null;
    #fold = false;
    #path = null;
    #childIds = [];
    #fileMapId = null;

    setInsertedIdAsId = insertedId => this.#id = insertedId;
    setFileMapId = fileMapId => this.#fileMapId = fileMapId;
    get = () => {
        const file = {
            name: this.#name,
            type: this.#type,
            fold: this.#fold,
            path: this.#path,
            childIds: [],
            fileMapId: this.#fileMapId
        };

        this.#id && file.id = this.#id;

        return file;
    };
};

