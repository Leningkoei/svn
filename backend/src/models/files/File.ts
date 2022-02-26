import ExportedFile from "./ExportedFile.js";
import Model from "../Model.js";

export default interface File extends Model {
  // static override
  importFields(fields: ExportedFile): File;

  delete(): Promise<void>;

  getPath(): string[];
  getType(): string;
  getIsOnDelete(): boolean;

  setIsOnDelete(isOnDelete: boolean): void;

  // override
  exportFields(): ExportedFile;

  // test
  print(): void;
};

