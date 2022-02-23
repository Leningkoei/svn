import User from "../models/users/User.js";

export default interface REQ {
  headers: Header;
  body?: any;
  query?: any;
};

interface Header {
  authorization: string;
}

