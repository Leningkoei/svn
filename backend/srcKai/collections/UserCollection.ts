import { ObjectId } from "mongodb";
import Collection from "./Collection.js";
import ExportedUser from "../models/users/ExportedUser.js";

export default interface UserCollection extends Collection {
  // C
  /**
   * [Override]
   */
  insertOne(document: ExportedUser): Promise<{ insertedId: ObjectId }>;

  // R
  /**
   * [Override]
   */
  findOne(query: { name: string }, options: {}): Promise<ExportedUser>;

  // U
  /**
   * [Override]
   */
  updateOne(query: { name: string }, content: { $set: ExportedUser }):
    Promise<unknown>;
};

