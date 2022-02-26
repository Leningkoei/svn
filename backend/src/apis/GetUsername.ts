import API from "./API.js";
import { REQ } from "../instances/token/Token.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import User from "../models/users/User.js";

export default class GetUsername extends API {
  public constructor(url) {
    super(url);
  };

  protected method: "get" | "post" = "get";
  protected name: string = "get user name";

  protected getContent(req: REQ): string {
    const user: User = req.user;

    return user.getName();
  };
  protected getMiddlewares(): Middleware[] {
    return [
      TokenProvider.prototype.get().getMiddleware()
    ];
  };
};

