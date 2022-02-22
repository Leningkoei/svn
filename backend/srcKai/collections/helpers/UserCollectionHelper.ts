import { ObjectId } from  "mongodb";
import UserCollection from "../UserCollection.js";
import Database         from "../../instances/Database.js";
import DatabaseProvider from "../../instances/providers/DatabaseProvider.js";
import Folder       from "../../models/files/Folder.js";
import ExportedUser from "../../models/users/ExportedUser.js";
import User         from "../../models/users/User.js";

interface IUserCollectionHelper {
  // C
  // override
  create(user: User): Promise<void>;

  // U
  // override
  read(name: string): Promise<User>;

  // R
  // override
  update(name: string, user: User): Promise<void>;

  // D
};

export default class UserCollectionHelper implements IUserCollectionHelper {
  public constructor() {
    this.database = DatabaseProvider.getDatabase();
  };

  // C
  // override
  public async create(user: User): Promise<void> {
    const collection: UserCollection = this.getCollection();

    const document: ExportedUser = user.exportFields();

    await collection.insertOne(document);
  };

  // R
  // override
  public async read(name: string): Promise<User> {
    const collection: UserCollection = this.getCollection();

    const query: { name: string } = { name };
    const options: {} = {};

    const result: ExportedUser = await collection.findOne(query, options);

    if (result) {
      return User.prototype.importFields(result);
    } else {
      return null;
    };
  };

  // U
  // override
  public async update(name: string, user: User): Promise<void> {
    const collection: UserCollection = this.getCollection();

    const query = { name };
    const content = { $set: user.exportFields() };

    await collection.updateOne(query, content);
  };

  // D

  private database: Database = undefined;

  private getCollection(): UserCollection {
    return <UserCollection> this.database.collection("User");
  };
};

