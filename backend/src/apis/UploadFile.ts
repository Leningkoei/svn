import multer from "multer";
import API from "./API.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import Router from "../instances/Router.js";
import { REQ as PREQ_A } from "../instances/token/Token.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import formData, { REQ as PREQ_B } from "../middlewares/formData.js";
import CommonFile from "../models/files/CommonFile.js";
import ExportedFolder from "../models/files/ExportedFolder.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";

interface REQ extends PREQ_A {
  body: Body;
  file: FileInfo;
  rootFolder?: Folder;
  targetCommonFile?: CommonFile;
};
interface Body {
  path: string;
};
interface FileInfo {
  originalname: string;
};

interface NREQ extends PREQ_B {
  user: User;
  rootFolder: Folder;
  targetCommonFile: CommonFile;
  file: NFileInfo;
};
interface NFileInfo extends FileInfo {
  filename: string;
};

export default class UploadFile extends API {
  public constructor(url: string, fieldname: string, destination: string) {
    super(url);

    this.fieldname = fieldname;
    this.destination = destination;
  };

  /**
   * [Override]
   */
  protected method: "post" = "post";
  /**
   * [Override]
   */
  protected name: string = "upload file";

  /**
   * [Override]
   */
  protected getMiddlewares(): (Middleware | Router)[] {
    return [
      TokenProvider.prototype.get().getMiddleware(),
      this.getFileUploadMiddleware(),
      formData
    ];
  };
  /**
   * [Override]
   */
  protected async getContent(req: NREQ): Promise<ExportedFolder> {
    const user: User = req.user;
    const root: Folder = req.rootFolder;
    const target: CommonFile = req.targetCommonFile;
    const filename: string = req.file.filename;

    target.setFilename(filename);
    await UserCollectionHelper.prototype.update(user.getName(), user);

    return root.exportFields();
  };

  private fileFilter: (
    req: REQ, file: FileInfo, callback: Callback
  ) => unknown =
    (req: REQ, file: FileInfo, callback: Callback): unknown => {
      const user: User = req.user;
      const name: string = file.originalname;
      const path: string[] = req.body.path.split(",");
      const commonFile: CommonFile = new CommonFile(name, undefined, path);
      const root: Folder = user.getRootFolder();
      const parentPath: string[] = path.slice(0, path.length - 1);
      const parent: Folder = <Folder> root.find(parentPath, Folder);

      try {
        parent.add(commonFile);
        req.rootFolder = root;
        req.targetCommonFile = commonFile;

        return callback(null, true);
      } catch (error: unknown) {
        return callback(error, false);
      };
    };

  private getFileUploadMiddleware(): Middleware {
    const upload: { single: (fieldname: string) => Middleware } = multer({
      dest: this.destination,
      fileFilter: this.fileFilter
    });

    return upload.single(this.fieldname);
  };

  private destination: string = undefined;
  private fieldname: string = undefined;
};

type Callback = (error: unknown | null, result: boolean) => unknown;

