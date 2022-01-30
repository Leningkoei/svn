import multer from "multer";
import Server from "../instances/Server.js";
import File from "../models/File.js";

export default class FileReceiver {
    constructor(url, fieldname, destination) {
        this.#server = Server.getServer();
    };

    this.#server = null;

    setListener = (method, url, fieldname, destination) => {
        this.#server[method](
            url,
            upload.single(fieldname),
            async (req, res) => {
                const userId = req.data.userId;
                const originalname = req.file.originalname;
                const filename = req.file.filename;
                const type = req.data.type;
                const fold = req.data.fold;
                const path = req.data.path;
                const file = new File(
                    originalname,
                    filename,
                    type,
                    fold,
                    path
                );

                res.send(/* TODO; */);
            };
        );
    };
};

