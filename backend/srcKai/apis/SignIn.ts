import API from "./API.js";
import REQ from "./REQ.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import Router from "../instances/Router.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import formData from "../middlewares/formData.js";
import User from "../models/users/User.js";

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
  protected getMiddlewares(): Router[] {
    return [ formData ];
  };
  /**
   * [Override]
   */
  protected async getContent(req: MyREQ): Promise<string> {
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
};

interface MyREQ extends REQ {
  /**
   * [Override]
   */
  query: Query;
};

interface Query {
  name: string;
  password: string;
};

