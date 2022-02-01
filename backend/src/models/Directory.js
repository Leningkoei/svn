export default class Directory {
    constructor(name, fold, path, children) {
        this.#name = name;
        this.#fold = fold;
        this.#path = path;
        this.#children = children;
    };

    #name = null;
    #fold = null;
    #path = null;
    #children = null;
    #type = "directory";

    getName = () => this.#name;
    getFold = () => this.#fold;
    getPath = () => this.#path;
    getChildren = () => this.#children;
    getType = () => this.#type;
};

