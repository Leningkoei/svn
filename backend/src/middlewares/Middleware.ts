import { REQ, RES } from "../apis/API.js";

export default Middleware;

type Middleware =
  (req: REQ, res: RES, next: () => void) => void | Promise<void>;

