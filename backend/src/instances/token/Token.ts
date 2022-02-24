import { REQ as PREQ, RES } from "../../apis/API.js";
import User from "../../models/users/User.js";

export interface REQ extends PREQ {
  user: User;
};

export default interface Token {
  create(name: string): string;
  getUserByToken(token: string): Promise<User>;

  getMiddleware(): (req: REQ, res: RES, next: () => void) => Promise<void>;
};

