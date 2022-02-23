import API from "./API.js";
import REQ from "./REQ.js";
import RES from "./RES.js";
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
  protected middlewares: Router[] = [ formData ];
  /**
   * [Override]
   */
  protected name: string = "sign in";

  /**
   * [Override]
   */
  protected async responser(req: MyREQ, res: RES): Promise<void> {
    const name: string = req.query.name;
    const user: User = await UserCollectionHelper.prototype.read(name);

    if (!user) {
      res.send({
        result: false,
        msg: "Unknown Username",
        content: null
      });

      return;
    };

    const password: string = req.query.password;

    if (user.getPassword() !== password) {
      res.send({
        result: false,
        msg: "Wrong Password ",
        content: null
      });

      return;
    };

    const token: string = TokenProvider.prototype.get().create(name);

    res.send({
      result: true,
      msg: "success",
      content: token
    });
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

