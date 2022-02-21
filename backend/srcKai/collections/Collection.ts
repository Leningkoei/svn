import { ObjectId } from "mongodb";
import ExportedModel from "../models/ExportedModel.js";

export default interface Collection {
  findOne(query: {}, options: {}): Promise<ExportedModel>;
  insertOne(document: {}): Promise<{ insertedId: ObjectId }>;
};

