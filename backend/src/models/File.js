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

    static importAttributes = attributes => new File(
        attributes.originalname,
        attributes.filename,
        attributes.path,
        attributes.type
    );

    exportAttributes = () => ({
        originalname: this.#originalname,
        filename: this.#filename,
        path: this.#path,
        type: this.#type
    });
};

