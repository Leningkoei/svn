import API from "./API.js";
import REQ from "../instances/token/REQAfterTokenMiddleware.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import ExportedFolder from "../models/files/ExportedFolder.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";

export default class GetRootFolder extends API {
  public constructor(url) {
    super(url);
  };

  /**
   * [Override]
   */
  protected method: "get" = "get";
  /**
   * [Override]
   */
  protected name: string = "get root folder";

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

    return user.getRootFolder().exportFields();
  };
};

