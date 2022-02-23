import API from "./API.js";
import REQ from "../instances/token/REQAfterTokenMiddleware.js";
import RES from "./RES.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
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
  protected middlewares: Middleware[] =
    [ TokenProvider.prototype.get().getMiddleware() ];

  /**
   * [Override]
   */
  protected name: string = "get root folder";

  /**
   * [Override]
   */
  protected async responser(req: REQ, res: RES): Promise<void> {
    const user: User = req.user;

    res.send({
      result: true,
      msg: "success",
      content: user.getRootFolder().exportFields()
    });
  };
};

