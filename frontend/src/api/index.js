import axios from "axios";

export default class API {
    static #baseUrl = "http://127.0.0.1:1024/server";

    static #getAuthorization = () => {
        const token = localStorage.getItem("token");

        if (token) {
            return { Authorization: `Bearer ${token}` };
        } else {
            throw new Error("Token ???");
        };
    };

    static deleteDirectory = path => axios.get(
        API.#baseUrl + "/delete-directory",
        {
            headers: { ...API.#getAuthorization() },
            params: { path }
        }
    );
    static getRootDirectory = () => axios.get(
        API.#baseUrl + "/get-root-directory",
        { headers: { ...API.#getAuthorization() } }
    );
};

