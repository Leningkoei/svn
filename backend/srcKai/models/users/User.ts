import ExportedUser from "./ExportedUser.js";
import Model from "../Model.js";
import Folder from "../files/Folder.js";

interface IUser extends Model {
  // static override
  importFields(fields: ExportedUser): User;

  getPassword(): string;
  getRootFolder(): Folder;
};

export default class User implements IUser {
  public importFields(fields: ExportedUser): User {
    return new User(
      fields.name, fields.password,
      Folder.prototype.importFields(fields.rootFolder)
    );
  };

  public constructor(name: string, password: string, rootFolder: Folder) {
    this.name = name;
    this.password = password;
    this.rootFolder = rootFolder;
  };

  // override
  public exportFields(): ExportedUser {
    return {
      name: this.name,
      password: this.password,
      rootFolder: this.rootFolder.exportFields()
    };
  };

  // override
  public getName(): string {
    return this.name;
  };
  // override
  public getPassword(): string {
    return this.password;
  };
  // override
  public getRootFolder(): Folder {
    return this.rootFolder;
  };

  private password: string = undefined;
  private rootFolder: Folder = undefined;

  // override
  private name: string = undefined;
};

