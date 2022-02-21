import { ObjectId } from "mongodb";
import Collection from "./Collection.js";
import Database from "../instances/Database.js";
import ExportedFile from "../models/files/ExportedFile.js";
import Folder from "../models/files/Folder.js";
import ExportedUser from "../models/users/ExportedUser.js";
import User from "../models/users/User.js";
import DatabaseProvider from "../providers/DatabaseProvider.js";

interface IUserCollection {
};

export default class UserCollection implements IUserCollection {
  public constructor() {
    this.database = DatabaseProvider.getDatabase();
  };

  // C
  public async createUser(user: User): Promise<void> {
    const collection: Collection = this.getCollection();

    const document: ExportedUser = user.exportFields();

    await collection.insertOne(document);
  };

  // R
  public async readUser(id: string): Promise<User> {
    const collection: Collection = this.getCollection();

    const query: { _id: ObjectId } = { _id: new ObjectId(id) };
    const options: {} = {};

    const result: ExportedUser =
      <ExportedUser> await collection.findOne(query, options);

    if (result) {
      return User.prototype.importFields(result);
    } else {
      return null;
    };
  };

  // U

  // D

  private database: Database = undefined;

  private getCollection(): Collection {
    return this.database.collection("User");
  };
};

