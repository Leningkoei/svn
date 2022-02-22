import { ObjectId } from  "mongodb";
import UserCollection from "../UserCollection.js";
import Database         from "../../instances/Database.js";
import DatabaseProvider from "../../instances/providers/DatabaseProvider.js";
import Folder       from "../../models/files/Folder.js";
import ExportedUser from "../../models/users/ExportedUser.js";
import User         from "../../models/users/User.js";

interface IUserCollectionHelper {
  // C
  /**
   * [Errorable] [Override]
   */
  create(name: string, user: User): Promise<void>;

  // U
  /**
   * [Override]
   */
  read(name: string): Promise<User>;

  // R
  /**
   * [Override]
   */
  update(name: string, user: User): Promise<void>;

  // D
};

export default class UserCollectionHelper implements IUserCollectionHelper {
  public constructor() {
    this.database = DatabaseProvider.getDatabase();
  };

  // C
  /**
   * [Errorable] [Override]
   */
  public async create(name: string, user: User): Promise<void> {
    const collection: UserCollection = this.getCollection();

    if (await this.read(name)) {
      console.error(
        "[Collection] [User]",
        ` Received name which has been existed: ${name}.`
      );
      throw new Error(
        "[Collection] [User] Received name which has been existed."
      );
    };

    const document: ExportedUser = user.exportFields();

    await collection.insertOne(document);
  };

  // R
  /**
   * [Override]
   */
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
  /**
   * [Override]
   */
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

