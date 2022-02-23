import API from "./API.js";
import REQ from "./REQ.js";
import RES from "./RES.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import Router from "../instances/Router.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";
import formData from "../middlewares/formData.js";

export default class SignUp extends API {
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
  protected name: string = "sign up";

  /**
   * [Override]
   */
  protected async responser(req: MyREQ, res: RES): Promise<void> {
    const name: string = req.query.name;
    const password: string = req.query.password;
    const user: User = new User(
      name, password,
      new Folder("root", [ "root" ], false, [])
    );

    try {
      await UserCollectionHelper.prototype.create(name, user);

      const token: string = TokenProvider.prototype.get().create(name);

      res.send({
        result: false,
        msg: token,
        content: token
      });
    } catch (error: unknown) {
      res.send({
        result: false,
        msg: "Same Username",
        content: null
      });
    };
  }
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

