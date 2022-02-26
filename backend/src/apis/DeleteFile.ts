import API from "./API.js";
import UserCollectionHelper from "../collections/user/UserCollectionHelper.js";
import { REQ as PREQ } from "../instances/token/Token.js";
import TokenProvider from "../instances/token/TokenProvider.js";
import Middleware from "../middlewares/Middleware.js";
import CommonFile from "../models/files/CommonFile.js";
import ExportedFolder from "../models/files/ExportedFolder.js";
import Folder from "../models/files/Folder.js";
import User from "../models/users/User.js";

interface REQ extends PREQ {
  query: Query;
};
interface Query {
  path: string[];
};

export default class DeleteFile extends API {
  public constructor(url: string) {
    super(url);
  };

  protected method: "get" = "get";
  protected name: string = "delete file";

  protected async getContent(req: REQ): Promise<ExportedFolder> {
    const user: User = req.user;
    const path: string[] = req.query.path;
    const root: Folder = user.getRootFolder();
    const target: CommonFile = <CommonFile> root.find(path, CommonFile);

    await target.delete();
    await UserCollectionHelper.prototype.update(user.getName(), user);

    return root.exportFields();
  };
  protected getMiddlewares(): Middleware[] {
    return [
      TokenProvider.prototype.get().getMiddleware()
    ];
  };
};

