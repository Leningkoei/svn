import Model from "../../models/Model.js";

export default interface CollectionHelper {
  // C
  create(key: unknown, model: Model): Promise<void>;

  // R
  read(key: unknown): Promise<Model>;

  // U
  update(key: unknown, model: Model): Promise<void>;

  // D
};

