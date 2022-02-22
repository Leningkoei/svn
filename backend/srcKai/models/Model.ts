import ExportedModel from "./ExportedModel.js";

export default interface Model {
  // static
  /**
   * It should be call when model be took out from database.
   * ExportedModel => Model;
   */
  importFields(fields: ExportedModel): Model;

  /**
   * It should be call when model be put in to database.
   * Model => ExportedModel;
   */
  exportFields(): ExportedModel;

  getName(): string;
};

