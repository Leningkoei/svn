import REQ from "../apis/REQ.js";
import RES from "../apis/RES.js";

export default Middleware;
type Middleware =
  (req: REQ, res: RES, next: () => void) => void | Promise<void>;

