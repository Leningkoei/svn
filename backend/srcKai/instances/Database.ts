import Collection from "../collections/Collection.js";

/**
 * type of MongoClient.db(dbName: string);
 */
export default interface Database {
  collection(collectionName: string): Collection;
};

