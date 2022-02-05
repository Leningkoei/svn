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

    addChild = child => this.#children.push(child);
    changeFold = () => this.#fold = !this.#fold;
    deleteIt = () => {
        this.#onDelete = true;

        this.#children.forEach(child => child.deleteIt());
    };
    #GetCurrentObjectHelpMap = {
        "directory": child => child.getName(),
        "file": child => child.getOriginalname()
    };
    getCurrentObject = path => {
        let currentObject = this;                                               // It possible be a file, and file must be the last;

        for (let i = 1; i < path.length; i++) {                                 // Skip root;
            // if (currentObject.#children) {
            const targetDirectoryName = path[i];

            for (const child of currentObject.#children) {
                // if (child.getType() == "directory") {
                //     if (child.#name == targetDirectoryName) {               // It returns is not must be the last;
                //         currentObject = child;
                //     };
                // };
                if (
                    this.#GetCurrentObjectHelpMap[child.getType()](child) ==
                    targetDirectoryName
                ) {
                    currentObject = child;
                };
            };
            // };
        };

        return currentObject;
    };
};

