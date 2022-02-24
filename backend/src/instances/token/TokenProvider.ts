import JWT from "jsonwebtoken";
import Token, { REQ } from "./Token.js";
import Provider from "../Provider.js";
import { RES } from "../../apis/API.js";
import UserCollectionHelper
  from "../../collections/user/UserCollectionHelper.js";
import User from "../../models/users/User.js";

interface ITokenProvider extends Provider {
  /**
   * [Static] [Override]
   */
  initialize(option: { optionStr: string }): void;
  /**
   * [Static] [Override]
   */
  get(): Token;
};

export default class TokenProvider implements ITokenProvider {
  /**
   * [Static] [Override]
   */
  public initialize(option: { optionStr: string }): void {
    if (TokenProvider.instance) {
      console.warn("[Token] TokenProvider has been initialized!");
    } else {
      TokenProvider.instance = new TokenProvider(option.optionStr);
    };
  };
  /**
   * [Errorable] [Static] [Override]
   */
  public get(): Token {
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

  public create(name: string): string {
    return JWT.sign({ name }, this.optionStr);
  };
  public async getUserByToken(token: string): Promise<User | null> {
    const name: string = JWT.verify(token, this.optionStr).name;
    const user: User | null = await UserCollectionHelper.prototype.read(name);

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
    const user: User | null = await this.getUserByToken(token);

    if (user) {
      req.user = user;

      next();
    } else {
      // throw new Error("Wrong Token");
      res.send({ result: false, msg: "Wrong Token", content: null });
    };
  };

  private optionStr: string = undefined;
  private token: Token = undefined;
};

