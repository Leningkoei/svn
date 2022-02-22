import JWT from "jsonwebtoken";
import REQ from "../REQ.js";
import RES from "../RES.js";
import Token from "../Token.js";
import User from "../../models/users/User.js";
import UserCollectionHelper
  from "../../collections/helpers/UserCollectionHelper.js";

export default class TokenProvider {
  public static initialize(optionStr: string): void {
    if (TokenProvider.instance) {
      console.warn("[Token] TokenProvider has been initialized!");
    } else {
      TokenProvider.instance = new TokenProvider(optionStr);
    };
  };
  /**
   * [Errorable]
   */
  public static getToken(): Token {
    if (TokenProvider.instance) {
      return TokenProvider.instance.token;
    } else {
      throw new Error("[Token] TokenProvider must be inititalize!");
    };
  };

  private static instance: TokenProvider = undefined;

  private constructor(optionStr: string) {
    this.token = new MyToken(optionStr);
  };

  private token: Token = undefined;
};

class MyToken implements Token {
  constructor(optionStr: string) {
    this.optionStr = optionStr;
  };

  public getToken(name: string): string {
    return JWT.sign({ name }, this.optionStr);
  };
  public async getUserByToken(token: string): Promise<User> {
    const name: string = JWT.verify(token, this.optionStr);
    const user: User = await (new UserCollectionHelper()).read(name);

    return user;
  };

  public getMiddleware(): (
    req: REQ, res: RES, next: () => void
  ) => Promise<void> {
    return this.middleware;
  };

  private middleware: (
    req: REQ, res: RES, next: () => void
  ) => Promise<void> = async (
    req: REQ, res: RES, next: () => void
  ): Promise<void> => {
    const token: string = req.headers.authorization.split(" ")[1];
    const user: User = await this.getUserByToken(token);

    if (user) {
      req.user = user;

      next();
    } else {
      res.send({ result: false, msg: "Token ???" });
    };
  };

  private optionStr: string = undefined;
  private token: Token = undefined;
};

