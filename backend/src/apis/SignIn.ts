import API from "./API.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import Router from "../instances/Router.js";
import { REQ as PREQ_A } from "../instances/token/Token.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import formData, { REQ as PREQ_B } from "../middlewares/formData.js";
import User from "../models/users/User.js";

interface REQ extends PREQ_A, PREQ_B {
  /**
   * [Override]
   */
  query: Query;
};
interface Query {
  name: string;
  password: string;
};

export default class SignIn extends API {
  public constructor(url: string) {
    super(url);
  };

  /**
   * [Override]
   */
  protected method: "post" = "post";
  /**
   * [Override]
   */
  protected name: string = "sign in";

  /**
   * [Override]
   */
  protected async getContent(req: REQ): Promise<string> {
    const name: string = req.query.name;
    const user: User = await UserCollectionHelper.prototype.read(name);

    if (!user) {
      throw new Error("Unknown User");
    };

    const password: string = req.query.password;

    if (user.getPassword() !== password) {
      throw new Error("Wrong Password");
    };

    const token: string = TokenProvider.prototype.get().create(name);

    return token;
  };
  /**
   * [Override]
   */
  protected getMiddlewares(): Router[] {
    return [ formData ];
  };
};

