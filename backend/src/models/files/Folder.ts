import CommonFile from "./CommonFile.js";
import ExportedFile from "./ExportedFile.js";
import ExportedFolder from "./ExportedFolder.js";
import File from "./File.js";

interface IFolder extends File {
  /**
   * [Errorable]
   */
  add(child: File): void;
  changeFold(): void;
  /**
   * [Ugly Method]
   */
  find(path: string[], type: typeof CommonFile | typeof Folder): File;

  isRepetitiveName(file: File): boolean;

  getChildren(): File[];
  getIsFold(): boolean;

  setIsFold(isFold: boolean): void;
};

/**
 * [Final]
 */
export default class Folder implements IFolder {
  /**
   * [Static] [Override]
   */
  public importFields(fields: ExportedFolder): Folder {
    return new Folder(
      fields.name, fields.path, fields.isFold,
      fields.children.map((child: ExportedFile) => map.get(child.type)(child))
    );
  };
  public constructor(
    name: string, path: string[],
    isFold: boolean, children: File[]
  ) {
    this.isOnDelete = false;

    this.name = name;
    this.path = path;
    this.type = "folder";
    this.isFold = isFold;
    this.children = children;
  };

  /**
   * [Errorable]
   */
  public add(child: File): void {
    if (this.isRepetitiveName(child)) {
      // console.error(
      //   "[Folder] The",
      //   `folder received a file which has the same name: ${child.getName()}.`
      // );
      throw new Error(
        "[Folder] Folder received a file which has been existed!"
      );
    };

    this.children.push(child);

    this.sort();
  };
  public changeFold(): void {
    this.isFold = !this.isFold;
  };
  public find(path: string[], type: typeof CommonFile | typeof Folder): File {
    let currentFolder: Folder = this;

    for (let i: number = 1; i < path.length - 1; i++) {
      const targetName: string = path[i];

      for (const child of currentFolder.children) {
        if (child.getName() === targetName && (child instanceof Folder)) {
          currentFolder = child;
        };
      };
    };

    const result: File = currentFolder.getChild(path[path.length - 1], type);

    return result? result: this;
  };

  public isRepetitiveName(file: File): boolean {
    return this.children.filter((child: File) =>
      (child.getName() === file.getName()) &&
      (child.getType() === file.getType())
    ).length !== 0;
  };

  public getChildren(): File[] {
    return this.children;
  };
  public getIsFold(): boolean {
    return this.isFold;
  };

  public setIsFold(isFold: boolean): void {
    this.isFold = isFold;
  };

  /**
   * [Catcherror] [Override]
   */
  public async delete(): Promise<void> {
    try {
      await Promise.all(this.children.map((child: File) => child.delete()));

      this.isOnDelete = true;
    } catch (error: unknown) {
      console.error(error);
    };
  };
  /**
   * [Override]
   */
  public exportFields(): ExportedFolder {
    return {
      name: this.name,
      path: this.path,
      type: this.type,
      isFold: this.isFold,
      children: this.children
        .filter((child: File) => !child.getIsOnDelete())
        .map((child: File) => child.exportFields())
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

  private getChild(
    name: string, type: typeof CommonFile | typeof Folder
  ): File | null {
    for (const child of this.children) {
      if ((child.getName() === name) && (child instanceof type)) {
        return child;
      };
    };

    return null;
  };
  private sort(): void {
    this.children.sort((a: File, b: File) => {
      switch (true) {
        case (!(a instanceof Folder) &&  (b instanceof Folder)):
          return -1;
        case ( (a instanceof Folder) && !(b instanceof Folder)):
          return 1;
        case ( (a instanceof Folder) &&  (b instanceof Folder)):
          return a.getName() < b.getName() ? -1 : 1;
        case (!(a instanceof Folder) && !(b instanceof Folder)):
          return a.getName() < b.getName() ? -1 : 1;
      };
    });
  };

  /**
   * [Test] [Override]
   */
  public print(): void {
    console.group(this.name);

    !this.isFold && this.children.forEach((child: File) => child.print());

    console.groupEnd();
  };

  private children: File[] = undefined;
  private isFold: boolean = undefined;

  /**
   * [Override]
   */
  private name: string = undefined;
  /**
   * [Override]
   */
  private path: string[] = undefined;
  /**
   * [Override]
   */
  private type: string = undefined;
  /**
   * [Override]
   */
  private isOnDelete: boolean = undefined;
};

const map: Map<string, (fields: ExportedFile) => File> =
  new Map<string, (fields: ExportedFile) => File>();
map.set("folder", Folder.prototype.importFields);
map.set("common file", CommonFile.prototype.importFields);

