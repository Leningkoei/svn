import multer from "multer";
import API from "./API.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import Router from "../instances/Router.js";
import REQ from "../instances/token/REQAfterTokenMiddleware.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import formData from "../middlewares/formData.js";
import CommonFile from "../models/files/CommonFile.js";
import ExportedFolder from "../models/files/ExportedFolder.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";

interface Query {
  path: string;
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
  protected async getContent(req: MyREQ): Promise<ExportedFolder> {
    const user: User = req.user;
    const root: Folder = req.rootFolder;

    await UserCollectionHelper.prototype.update(user.getName(), user);

    return root.exportFields();
  };

  private fileFilter: (
    req: MyREQ, file: FileInfo, callback: Callback
  ) => unknown =
    (req: MyREQ, file: FileInfo, callback: Callback): unknown => {
      const user: User = req.user;
      const name: string = file.originalname;
      const filename: string = file.filename;
      const path: string[] = req.body.path.split(",");
      const commonFile: CommonFile = new CommonFile(name, filename, path);
      const root: Folder = user.getRootFolder();
      const parentPath: string[] = path.slice(0, path.length - 1);
      const parent: Folder = <Folder> root.find(parentPath, Folder);

      try {
        parent.add(commonFile);
        req.rootFolder = root;

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

interface MyREQ extends REQ {
  file: FileInfo;
  query: Query;
  rootFolder: Folder;
};
interface FileInfo {
  originalname: string;
  filename: string;
};
type Callback = (error: unknown | null, result: boolean) => unknown;

