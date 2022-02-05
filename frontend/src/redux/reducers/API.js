import axios from "axios";

const initState = class API {
    static #baseUrl = "http://127.0.0.1:1024/server";

    static #getAuthorization = () => {
        const token = localStorage.getItem("token");

        if (token) {
            return { Authorization: `Bearer ${token}` };
        } else {
            throw new Error("Token ???");
        };
    };

    static changeFold = params => axios.get(
        API.#baseUrl + "/change-fold",
        {
            headers: { ...API.#getAuthorization() },
            params
        }
    );
    static createDirectory = params => axios.get(
        API.#baseUrl + "/create-directory",
        {
            headers: { ...API.#getAuthorization() },
            params
        }
    );
    static deleteDirectory = params => axios.get(
        API.#baseUrl + "/delete-directory",
        {
            headers: { ...API.#getAuthorization() },
            params
        }
    );
    static deleteFile = params => axios.get(
        API.#baseUrl + "/delete-file",
        {
            headers: { ...API.#getAuthorization() },
            params
        }
    );
    static downloadFile = (originalname, path) => {
        const token = localStorage.getItem("token");

        let url = API.#baseUrl + "/download-file";
        url += `?token=${token}&originalname=${originalname}`;
        path.forEach(name => url += `&path[]=${name}`);

        location.href = url;
    };
    static getRootDirectory = () => axios.get(
        API.#baseUrl + "/get-root-directory",
        { headers: { ...API.#getAuthorization() } }
    );
    static uploadFile = formData => axios.post(
        API.#baseUrl + "/upload-file",
        formData,
        { headers: {
            ...API.#getAuthorization(),
            "Content-Type": "multipart/form-data"
        } }
    );
};

export default () => {
    return initState;
};

