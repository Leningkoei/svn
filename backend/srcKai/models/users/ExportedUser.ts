import ExportedModel from "../ExportedModel.js";

export default interface ExportedUser extends ExportedModel {
  password: string;
  // rootFolder: ExportedFolder;
};

