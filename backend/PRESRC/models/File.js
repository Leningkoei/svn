import deleteFile from "../natives/deleteFile.js";

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
    #onDelete = false;

    getOriginalname = () => this.#originalname;
    getFilename = () => this.#filename;
    getPath = () => this.#path;
    getType = () => this.#type;
    getOnDelete = () => this.#onDelete;

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

    deleteIt = () => {
        deleteFile(this.#filename);
        this.#onDelete = true;
    };
};

