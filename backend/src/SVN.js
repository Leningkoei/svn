import Database from "./instances/Database.js";
import Server from "./instances/Server.js";
import ChangeFold from "./api/ChangeFold.js";
import CreateDirectory from "./api/CreateDirectory.js";
import DeleteDirectory from "./api/DeleteDirectory.js";
import DeleteFile from "./api/DeleteFile.js";
import DownloadFile from "./api/DownloadFile.js";
import GetRootDirectory from "./api/GetRootDirectory.js";
import SignUp from "./api/SignUp.js";
import UploadFile from "./api/UploadFile.js";

export default class SVN {
    constructor(port) {
        console.log("[Log] [Main] Preparing backend server...");

        this.#port = port;
    };

    #port = null;

    #initialize = async () => {
        Server.initialize();
        await Database.initialize();
    };
    #setListeners = () => {
        const changeFold = new ChangeFold("/server/change-fold");
        const createDirectory = new CreateDirectory("/server/create-directory");
        const deleteDirectory = new DeleteDirectory("/server/delete-directory");
        const deleteFile = new DeleteFile("/server/delete-file");
        const downloadFile = new DownloadFile("/server/download-file");
        const getRootDirectory =
            new GetRootDirectory("/server/get-root-directory");
        const signUp = new SignUp("/server/sign-up");
        const uploadFile =
            new UploadFile("/server/upload-file", "file", "./files");

        changeFold.setListener();
        createDirectory.setListener();
        deleteDirectory.setListener();
        deleteFile.setListener();
        downloadFile.setListener();
        getRootDirectory.setListener();
        signUp.setListener();
        uploadFile.setListener();
    };
    #setServer = () => {
        Server.getServer().listen(this.#port, () => {
            console.log(
                "[Log] [Main] " +
                "Backend server is running at " +
                `http://127.0.0.1:${this.#port}/server.`
            );
        });
    };

    main = async () => {
        await this.#initialize();
        this.#setListeners();
        this.#setServer();
    };
};

