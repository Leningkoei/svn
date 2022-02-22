import { ObjectId } from "mongodb";
import ExportedModel from "../models/ExportedModel.js";

export default interface Collection {
  // C
  insertOne(document: {}): Promise<{ insertedId: ObjectId }>;

  // R
  findOne(query: {}, options: {}): Promise<ExportedModel>;

  // U
  updateOne(query: {}, content: { $set: ExportedModel }): Promise<unknown>;
};

