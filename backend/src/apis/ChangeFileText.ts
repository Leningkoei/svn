import Path from "path";
import API from "./API.js";
import Router from "../instances/Router.js";
import { REQ as PREQ_A } from "../instances/token/Token.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import formData, { REQ as PREQ_B } from "../middlewares/formData.js";
import CommonFile from "../models/files/CommonFile.js";
import ExportedFolder from "../models/files/ExportedFolder.js";
import File from "../models/files/File.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";
import changeFileText from "../natives/changeFileText.js";

interface REQ extends PREQ_A, PREQ_B {
  query: Query;
};
interface Query {
  text: string;
  path: string[];
};

export default class ChangeFileText extends API {
  public constructor(url: string, destination: string = "files") {
    super(url);

    this.destination = destination;
  };

  protected method: "get" | "post" = "post";
  protected name: string = "change file text";

  protected async getContent(req: REQ): Promise<ExportedFolder> {
    const user: User = req.user;
    const root: Folder = user.getRootFolder();
    const path: string[] = req.query.path;
    const targetPre: File = root.find(path, CommonFile);

    if (targetPre === root) {
      throw new Error("File Has Not Exist!");
    };

    const target: CommonFile = <CommonFile> targetPre;

    const filename: string = target.getFilename();
    const filepath: string = Path.resolve(this.destination, filename);
    const text: string = req.query.text;

    await changeFileText(filepath, text);

    return root.exportFields();
  };
  protected getMiddlewares(): (Middleware | Router)[] {
    return [
      TokenProvider.prototype.get().getMiddleware(),
      formData
    ];
  };

  private destination: string = undefined;
};

