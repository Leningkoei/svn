import { unlink } from "fs";
import path from "path";

export default filename => {
    unlink(path.resolve("files", filename), err => {
        if (err) { throw err; };
    });
};

