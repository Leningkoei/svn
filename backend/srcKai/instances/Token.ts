import REQ from "./REQ.js";
import RES from "./RES.js";
import User from "../models/users/User.js";

export default interface Token {
  getToken(name: string): string;
  getUserByToken(token: string): Promise<User>;

  getMiddleware(): (req: REQ, res: RES, next: () => void) => Promise<void>;
};

