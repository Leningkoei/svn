import File from "./File.js";

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

    static #map = {
        directory: Directory.importAttributes,
        file: File.importAttributes
    };
    static importAttributes = attributes => {
        return new Directory(
            attributes.name,
            attributes.fold,
            attributes.path,
            attributes.children.map(child => Directory.#map[child.type](child))
        );
    };
    exportAttributes = () => ({
        name: this.#name,
        fold: this.#fold,
        path: this.#path,
        children: this.#children.map(child => child.exportAttributes()),
        type: this.#type
    });
};

