export default class FileMapItem {
    constructor(originalname, filename) {
        this.#filename = filename;
        this.#originalname = originalname;
    };

    #id = null;
    #originalname = null;
    #filename = null;

    addInsertedIdAsId = insertedId => this.#id = insertedId;
    get = () => {
        const file = {
            filename: this.#filename,
            originalname: this.#originalname
        };

        this.#id && file.id = this.#id;

        return file;
    };
    stringify = () => (
        "insertedId: " + this.#id + ", " +
        "originalname: " + this.#originalname + ", " +
        "filename: " + this.#filename
    );
};

