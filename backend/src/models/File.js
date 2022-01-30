export default File {
    constructor(id, originalname, filename, path) {
        this.#id = id;
        this.#originalname = originalname;
        this.#filename = filename;
        this.#path = path;
    };

    #id = null;
    #originalname = null;
    #filename = null;
    #path = null;

    getId = () => this.#id;
    getOriginalname = () => this.#originalname;
    getFilename = () => this.#filename;
    getPath = () => this.#path;
};

