import { Data } from "./RES.js";

export default function getErrorRESData(error: unknown): Data {
  return {
    result: false,
    msg: error.toString().substring(6),
    content: null
  };
};

