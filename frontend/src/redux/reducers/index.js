import { combineReducers } from "redux";
import API from "./API.js";
import fileInfo from "./fileInfo.js";
import rootDirectory from "./rootDirectory.js";

export default combineReducers({
    API,
    fileInfo,
    rootDirectory
});

