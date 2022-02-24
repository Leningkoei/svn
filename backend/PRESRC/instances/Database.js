import { MongoClient } from "mongodb";

export default class Database {
    /* private */ constructor(database) {
        this.#database = database;
    };

    static #INSTANCE = null;

    static initialize = async () => {
        if (Database.#INSTANCE === null) {
            const url = "mongodb://127.0.0.1:27017";
            const client = new MongoClient(url);

            await client.connect();

            console.log(
                "[Log] [Database] " +
                "Connect database server successfully."
            );

            const dbName = "svn";

            Database.#INSTANCE = new Database(client.db(dbName));
        } else {
            console.log("[Warning] [Database] Database has been initialized!");
        };
    };
    static getDatabase = () => {
        if (Database.#INSTANCE === null) {
            throw new Error("[Error] [Database] Database must be initialize!");
        } else {
            return Database.#INSTANCE.#database;
        };
    };

    #database = null;
};

