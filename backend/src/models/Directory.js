export default Directory {
    constructor(id, name, fold, path, children) {
        this.#id = id;
        this.#name = name;
        this.#fold = fold;
        this.#path = path;
        this.#children = children;
    };

    #id = null;
    #name = null;
    #fold = null;
    #path = null;
    #children = null;

    getId = () => this.#id;
    getName = () => this.#name;
    getFold = () => this.#fold;
    getPath = () => this.#path;
    getChildren = () => this.#children;
};

