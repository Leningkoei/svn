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
  path: string[];
  token: string;
};

export default class GetImg extends API {
  public constructor(url: string, destination: string = "files") {
    super(url);

    this.destination = destination;
  };

  protected method: "get" = "get";
  protected name: string = "get img";

  protected async getContent(req: REQ): Promise<Content> {
    const tokenData: string = req.query.token;
    const token: Token = TokenProvider.prototype.get();
    const user: User = await token.getUserByToken(tokenData);

    if (!user) {
      throw new Error("Wrong Token");
    };

    const root: Folder = user.getRootFolder();
    const path: string[] = req.query.path;
    const target: CommonFile = <CommonFile> root.find(path, CommonFile);
    const filename: string = target.getFilename();
    const filepath: string = Path.resolve(this.destination, filename);

    return { filepath };
  };
  protected getMiddlewares(): Middleware[] {
    return [];
  };
  protected handleSuccess(res: RES, content: Content): void {
    const filepath: string = content.filepath;

    res.sendFile(filepath);
  };

  private destination = undefined;
};

interface Content {
  filepath: string;
};

