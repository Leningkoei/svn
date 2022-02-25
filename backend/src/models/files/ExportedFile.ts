import ExportedModel from "../ExportedModel.js";

export default interface ExportedFile extends ExportedModel {
  path: string[];
  type: string;
};

