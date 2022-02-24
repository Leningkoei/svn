import Path from "path";
import API, { REQ as PREQ, RES } from "./API.js";
import Token from "../instances/token/Token.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import CommonFile from "../models/files/CommonFile.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";

interface REQ extends PREQ {
  query: Query;
};
interface Query {
  originalname: string;
  path: string[];
  token: string;
};

export default class DownloadFile extends API {
  public constructor(url: string) {
    super(url);
  };

  protected method: "get" = "get";
  protected name: string = "download file";

  protected async getContent(req: REQ): Promise<Content> {
    const tokenData: string = req.query.token;
    const token: Token = TokenProvider.prototype.get();
    const user: User | null = await token.getUserByToken(tokenData);

    if (!user) {
      throw new Error("Wrong Token");
    };

    const root: Folder = user.getRootFolder();
    const path: string[] = req.query.path;
    const target: CommonFile = <CommonFile> root.find(path, CommonFile);
    const filename: string = target.getFilename();
    const filepath: string = Path.resolve("files", filename);
    const name: string = req.query.originalname;

    return {
      filepath,
      name
    };
  };
  protected getMiddlewares(): Middleware[] {
    return [];
  };
  protected handleSuccess(res: RES, content: Content): void {
    const { filepath, name } = content;

    res.download(filepath, name);
  };
};

interface Content {
  filepath: string;
  name: string;
};

