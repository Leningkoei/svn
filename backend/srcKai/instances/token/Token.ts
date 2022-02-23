import REQ from "../../apis/REQ.js";
import RES from "../../apis/RES.js";
import User from "../../models/users/User.js";

export default interface Token {
  create(name: string): string;
  getUserByToken(token: string): Promise<User>;

  getMiddleware(): (req: REQ, res: RES, next: () => void) => Promise<void>;
};

