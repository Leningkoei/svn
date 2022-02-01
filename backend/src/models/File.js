export default class File {
    constructor(originalname, filename, path) {
        this.#originalname = originalname;
        this.#filename = filename;
        this.#path = path;
    };

    #originalname = null;
    #filename = null;
    #path = null;
    #type = "file";

    getOriginalname = () => this.#originalname;
    getFilename = () => this.#filename;
    getPath = () => this.#path;
    getType = () => this.#type;
};

