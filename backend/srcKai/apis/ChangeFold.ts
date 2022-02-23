import API from "./API.js";
import RES from "./RES.js";
import getErrorRESData from "./getErrorRESData.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import REQ from "../instances/token/REQAfterTokenMiddleware.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";

interface MyREQ extends REQ {
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
  protected middlewares: Middleware[] =
    [ TokenProvider.prototype.get().getMiddleware() ];
  /**
   * [Override]
   */
  protected name: string = "change fold";

  /**
   * [Override]
   */
  protected async responser(req: REQ, res: RES): Promise<void> {
    const user: User = req.user;
    const path: string[] = req.query.path;
    const root: Folder = user.getRootFolder();
    const target: Folder | null = <Folder> root.find(path, Folder);

    target.changeFold();

    try {
      await UserCollectionHelper.prototype.update(user.getName(), user);

      res.send({
        result: true,
        msg: "success",
        content: root.exportFields()
      });
    } catch (error: unknown) {
      res.send(getErrorRESData(error));
    };
  };
};

