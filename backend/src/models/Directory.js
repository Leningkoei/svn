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
    #onDelete = false;

    getName = () => this.#name;
    getFold = () => this.#fold;
    getPath = () => this.#path;
    getChildren = () => this.#children;
    getType = () => this.#type;
    getOnDelete = () => this.#onDelete;

    static importAttributes = attributes => {
        return new Directory(
            attributes.name,
            attributes.fold,
            attributes.path,
            attributes.children.map(child => Directory.#map[child.type](child))
        );
    };
    static #map = {
        directory: Directory.importAttributes,
        file: File.importAttributes
    };

    exportAttributes = () => ({
        name: this.#name,
        fold: this.#fold,
        path: this.#path,
        children: this.#children
            .filter(child => !child.getOnDelete())
            .map(child => child.exportAttributes()),
        type: this.#type
    });

    #getChildNames = () => this.#children.map(
        child => this.#getObjectNameFuncMap[child.getType()](child)
    );
    #getObjectNameFuncMap = {
        "directory": object => object.getName(),
        "file": object => object.getOriginalname()
    };

    addChild = child => this.#children.push(child);
    checkChildName = childName => !this.#getChildNames().includes(childName);
    changeFold = () => this.#fold = !this.#fold;
    deleteIt = () => {
        this.#onDelete = true;

        this.#children.forEach(child => child.deleteIt());
    };
    getCurrentObject = path => {
        let currentObject = this;                                               // It possible be a file, and file must be the last;

        for (let i = 1; i < path.length; i++) {                                 // Skip root;
            const targetDirectoryName = path[i];

            for (const child of currentObject.#children) {
                if (
                    this.#getObjectNameFuncMap[child.getType()](child) ==
                    targetDirectoryName
                ) {
                    currentObject = child;
                };
            };
        };

        return currentObject;
    };
};

