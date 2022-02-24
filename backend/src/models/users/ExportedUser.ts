import ExportedModel from "../ExportedModel.js";
import ExportedFolder from "../files/ExportedFolder.js";

export default interface ExportedUser extends ExportedModel {
  password: string;
  rootFolder: ExportedFolder;
};

