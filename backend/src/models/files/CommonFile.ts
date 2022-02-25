import ExportedFile from "./ExportedFile.js";
import File from "./File.js";
import deleteFile from "../../natives/deleteFile.js";

// filename => filename;
// originalname => name;

interface ICommonFile extends File {
  getFilename(): string;

  setFilename(filename: string): void;
};

export default class CommonFile implements ICommonFile {
  /**
   * [Static] [Override]
   */
  public importFields(fields: ExportedCommonFile): CommonFile {
    return new CommonFile(fields.name, fields.filename, fields.path);
  };

  public constructor(originalname: string, filename: string, path: string[]) {
    this.isOnDelete = false;

    this.name = originalname;
    this.filename = filename;
    this.path = path;
    this.type = "common file";
  };

  public getFilename(): string {
    return this.filename;
  };

  public setFilename(filename: string) {
    this.filename = filename;
  };

  /**
   * [Errorable] [Override]
   */
  public async delete(): Promise<void> {
    try {
      await deleteFile(this.filename);

      this.isOnDelete = true;
    } catch (error: unknown) {
      throw error;
    };
  };
  /**
   * [Override]
   */
  public exportFields(): ExportedCommonFile {
    return {
      name: this.name,
      path: this.path,
      type: this.type,
      filename: this.filename
    };
  };

  /**
   * [Override]
   */
  public getName(): string {
    return this.name;
  };
  /**
   * [Override]
   */
  public getPath(): string[] {
    return this.path;
  };
  /**
   * [Override]
   */
  public getType(): string {
    return this.type;
  };
  /**
   * [Override]
   */
  public getIsOnDelete(): boolean {
    return this.isOnDelete;
  };

  /**
   * [Override]
   */
  public setIsOnDelete(isOnDelete: boolean): void {
    this.isOnDelete = isOnDelete;
  };

  protected filename: string = undefined;

  /**
   * [Override]
   */
  protected name: string = undefined;
  /**
   * [Override]
   */
  protected path: string[] = undefined;
  /**
   * [Override]
   */
  protected type: string = undefined;
  /**
   * [Override]
   */
  protected isOnDelete: boolean = undefined;

  /**
   * [Test] [Override]
   */
  print(): void {
    console.log(this.name);
  };
};

interface ExportedCommonFile extends ExportedFile {
  filename: string;
};

