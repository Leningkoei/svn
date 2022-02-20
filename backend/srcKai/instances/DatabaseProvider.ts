import { MongoClient } from "mongodb";

// type of MongoClient.db(dbName: string);
interface Database {
};

export default class DatabaseProvider {
  public static async initialize(): Promise<void> {
    if (DatabaseProvider.instance) {
      console.warn("[Database] DatabaseProvider has been initialized!");
    } else {
      const url: string = "mongodb://127.0.0.1:27017";
      const client: MongoClient = new MongoClient(url);

      await client.connect();

      console.log("[Database] Connect database server successfully.");

      const dbName: string = "svn";

      DatabaseProvider.instance = new DatabaseProvider(client.db(dbName));
    };
  };
  public static getDatabaseProvider(): Database {
    if (DatabaseProvider.instance) {
      return DatabaseProvider.instance.database;
    } else {
      throw new Error("[Database] DatabaseProvider must be initialize!");
    };
  };

  private static instance: DatabaseProvider = undefined;

  private constructor(database: Database) {
    this.database = database;
  };

  private database: Database = undefined;
};

