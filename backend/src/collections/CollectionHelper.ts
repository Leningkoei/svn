import Model from "../models/Model.js";

export default interface CollectionHelper {
  // C
  /**
   * [Errorable] [Static]
   */
  create(key: unknown, model: Model): Promise<void>;

  // R
  /**
   * [Static]
   */
  read(key: unknown): Promise<Model | null>;

  // U
  /**
   * [Static]
   */
  update(key: unknown, model: Model): Promise<void>;

  // D
};

