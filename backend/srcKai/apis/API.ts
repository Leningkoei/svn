import REQ from "./REQ.js";
import RES from "./RES.js";
import Middleware from "../middlewares/Middleware.js";
import Router from "../instances/Router.js";
import Server from "../instances/server/Server.js";
import ServerProvider from "../instances/server/ServerProvider.js";

interface IAPI {
  setListener(): void;
};

export default abstract class API implements IAPI {
  protected constructor(url: string) {
    this.server = ServerProvider.prototype.get();

    this.url = url;
  };

  public setListener(): void {
    this.server[this.method](
      this.url,
      ...this.middlewares,
      this.responser
    );

    console.log("[Listener]", `${this.name} has listening ${this.url}`);
  };

  protected abstract method: "get" | "post";
  protected abstract middlewares: (Middleware | Router)[];
  protected abstract name: string;

  protected abstract responser(req: REQ, res: RES): void | Promise<void>;

  private server: Server = undefined;
  private url: string = undefined;
};

