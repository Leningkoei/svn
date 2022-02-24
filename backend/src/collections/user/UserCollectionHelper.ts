import { ObjectId } from  "mongodb";
import UserCollection from "./UserCollection.js";
import CollectionHelper from "../CollectionHelper.js";
import Database         from "../../instances/database/Database.js";
import DatabaseProvider from "../../instances/database/DatabaseProvider.js";
import Folder       from "../../models/files/Folder.js";
import ExportedUser from "../../models/users/ExportedUser.js";
import User         from "../../models/users/User.js";

interface IUserCollectionHelper extends CollectionHelper {
  // C
  /**
   * [Errorable] [Static] [Override]
   */
  create(name: string, user: User): Promise<void>;

  // U
  /**
   * [Static] [Override]
   */
  read(name: string): Promise<User | null>;

  // R
  /**
   * [Errorable] [Static] [Override]
   */
  update(name: string, user: User): Promise<void>;

  // D
};

export default class UserCollectionHelper implements IUserCollectionHelper {
  // C
  /**
   * [Errorable] [Static] [Override]
   */
  public async create(name: string, user: User): Promise<void> {
    const collection: UserCollection =
      UserCollectionHelper.prototype.getCollection();

    if (await UserCollectionHelper.prototype.read(name)) {
      // console.error(
      //   "[Collection] [User] [C]",
      //   ` Received name which has been existed: ${name}.`
      // );
      throw new Error(
        "[Collection] [User] [C] Received name which has been existed."
      );
    };

    const document: ExportedUser = user.exportFields();

    await collection.insertOne(document);
  };

  // R
  /**
   * [Static] [Override]
   */
  public async read(name: string): Promise<User | null> {
    const collection: UserCollection =
      UserCollectionHelper.prototype.getCollection();

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
   * [Errorable] [Static] [Override]
   */
  public async update(name: string, user: User): Promise<void> {
    const collection: UserCollection =
      UserCollectionHelper.prototype.getCollection();

    if (!(await UserCollectionHelper.prototype.read(name))) {
      // console.log(
      //   "[Collection] [User] [U]",
      //   ` Received name which not has been existed: ${name}.`
      // );
      throw new Error(
        "[Collection] [User] [U] Received name which not has been existed."
      );
    };

    const query: { name: string } = { name };
    const content: { $set: ExportedUser } = { $set: user.exportFields() };

    await collection.updateOne(query, content);
  };

  // D

  /**
   * [Static]
   */
  private getCollection(): UserCollection {
    const database: Database = DatabaseProvider.prototype.get();

    return <UserCollection> database.collection("User");
  };

  private constructor() {};
};

