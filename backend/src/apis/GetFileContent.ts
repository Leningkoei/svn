import Path from "path";
import API, { RES } from "./API.js";
import { REQ as PREQ } from "../instances/token/Token.js";
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
};

export default class GetFileContent extends API {
  public constructor(url: string, destination: string = "files") {
    super(url);

    this.destination = destination;
  };

  protected method: "get" = "get";
  protected name: string = "get file content";

  protected async getContent(req: REQ): Promise<Content> {
    const user: User = req.user;
    const root: Folder = user.getRootFolder();
    const path: string[] = req.query.path;
    const target: CommonFile = <CommonFile> root.find(path, CommonFile);
    const filename: string = target.getFilename();
    const filepath: string = Path.resolve(this.destination, filename);

    return { filepath };
  };
  protected getMiddlewares(): Middleware[] {
    return [
      TokenProvider.prototype.get().getMiddleware()
    ];
  };
  protected handleSuccess(res: RES, content: Content): void {
    const filepath: string = content.filepath;

    res.sendFile(filepath);
  };

  private destination: string = undefined;
};

interface Content {
  filepath: string;
};

