import REQ from "./REQ.js";
import RES, { Data } from "./RES.js";
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
      ...this.getMiddlewares(),
      this.getResponser()
    );

    console.log("[Listener]", `${this.name} has listening ${this.url}`);
  };

  protected abstract method: "get" | "post";
  protected abstract name: string;

  /**
   * [Errorabel]
   */
  protected abstract getContent(req: REQ): unknown;
  protected abstract getMiddlewares(): (Middleware | Router)[];

  private getResponser(): Middleware {
    return async (req: REQ, res: RES): Promise<void> => {
      try {
        const content: unknown = await this.getContent(req);

        res.send({
          result: true,
          msg: "success",
          content
        });
      } catch (error: unknown) {
        res.send({
          result: false,
          msg: error.toString().substring(6),
          content: null
        });
      };
    };
  };

  private server: Server = undefined;
  private url: string = undefined;
};

