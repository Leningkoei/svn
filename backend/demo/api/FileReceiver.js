import multer from "multer";
import Server from "../instances/Server.js";
import FileMap from "../collections/FileMap.js";
import FileMapItem from "../models/FileMapItem.js";

export default class FileReceiver {
    /*
     * config = {
     *     destination: "./files",
     *     fieldname: "file",
     *     url: "/server/file-receiver"
     * };
     */
    constructor(config) {
        this.#fileMap = new FileMap();
        this.#server = Server.get().getServer();

        this.#destination = config.destination;
        this.#fieldname = config.fieldname;
        this.#url = config.url;

        if (!(this.#destination && this.#fieldname && this.#url)) {
            console.log(this.#destination);
            console.log(this.#fieldname);
            console.log(this.#url);
            throw new Error(
                "[Error] [FileReceiver] " +
                "Receive an illegal config object!"
            );
        };
    };

    #fileMap = null;
    #server = null;

    #destination = null;
    #fieldname = null;
    #url = null;

    setFileReceiverListener = method => {
        const upload = multer({
            dest: this.#destination
        });

        this.#server[method](
            this.#url,
            upload.single(this.#fieldname),
            async (req, res) => {
                console.log("[Log] [Access] FileReceiverListener is accessed.");

                const fileMapItem = new FileMapItem(
                    req.file.originalname,
                    req.file.filename
                );

                await this.#fileMap.createFileMap(fileMapItem);

                res.send({
                    fileMapItem: fileMapItem.get()
                });

                console.log(
                    "[Log] [Access] " +
                    "FileReceiver has responsed this request."
                );
            }
        );

        console.log("[Log] [Listener] FileReceiverListener has been prepared.");
    };
};

