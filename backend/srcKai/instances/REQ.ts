import User from "../models/users/User.js";

export default interface REQ {
  headers: Header;
  user?: User;
};

interface Header {
  authorization: string;
}

