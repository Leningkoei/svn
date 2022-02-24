import API from "./API.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import { REQ as PREQ } from "../instances/token/Token.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import ExportedFolder from "../models/files/ExportedFolder.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";

interface REQ extends PREQ {
  query: Query;
};
interface Query {
  dirname: string;
  path: string[];
};

export default class CreateFolder extends API {
  public constructor(url: string) {
    super(url);
  };

  /**
   * [Override]
   */
  protected method: "get" = "get";
  /**
   * [Override]
   */
  protected name: string = "create folder";

  /**
   * [Override]
   */
  protected async getContent(req: REQ): Promise<ExportedFolder> {
    const user: User = req.user;
    const dirname: string = req.query.dirname;
    const path: string[] = req.query.path;
    const parentPath: string[] = path.slice(0, path.length - 1);
    const root: Folder = user.getRootFolder();
    const parent: Folder = <Folder> root.find(parentPath, Folder);
    const it: Folder = new Folder(dirname, path, false, []);

    parent.add(it);
    await UserCollectionHelper.prototype.update(user.getName(), user);

    return root.exportFields();
  };
  /**
   * [Override]
   */
  protected getMiddlewares(): Middleware[] {
    return [ TokenProvider.prototype.get().getMiddleware() ];
  };
};

