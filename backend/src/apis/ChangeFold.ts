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
  path: string[];
};

export default class ChangeFold extends API {
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
  protected name: string = "change fold";

  /**
   * [Override]
   */
  protected getMiddlewares(): Middleware[] {
    return [ TokenProvider.prototype.get().getMiddleware() ];
  };
  /**
   * [Override]
   */
  protected async getContent(req: REQ): Promise<ExportedFolder> {
    const user: User = req.user;
    const path: string[] = req.query.path;
    const root: Folder = user.getRootFolder();
    const target: Folder | null = <Folder> root.find(path, Folder);

    target.changeFold();
    await UserCollectionHelper.prototype.update(user.getName(), user);

    return root.exportFields();
  };
};

