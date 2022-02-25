import ExportedFile from "./ExportedFile.js";

export default interface ExportedFolder extends ExportedFile {
  children: ExportedFile[];
  isFold: boolean;
};

