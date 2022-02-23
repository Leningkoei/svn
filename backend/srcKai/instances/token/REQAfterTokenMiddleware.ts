import REQ from "../../apis/REQ.js";
import User from "../../models/users/User.js";

export default interface REQAfterTokenMiddleware extends REQ {
  user: User;
};

