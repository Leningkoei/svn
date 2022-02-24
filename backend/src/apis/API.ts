import Middleware from "../middlewares/Middleware.js";
import Router from "../instances/Router.js";
import Server from "../instances/server/Server.js";
import ServerProvider from "../instances/server/ServerProvider.js";

export interface REQ {
  headers: Header;
};
interface Header {
  authorization: string;
};

export interface RES {
  send(data: Data): void;
  download(filepath: string, name: string): void;
};
interface Data {
  result: boolean;
  msg: string;
  content: unknown | null;
};

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
  protected abstract getContent(req: unknown): unknown;
  protected abstract getMiddlewares(): (Middleware | Router)[];

  protected handleSuccess(res: RES, content: unknown): void {
    res.send({
      result: true,
      msg: "success",
      content
    });
  };
  protected handleError(res: RES, error: unknown): void {
    res.send({
      result: false,
      msg: error.toString().substring(6),
      content: null
    });
  };

  private getResponser(): Middleware {
    return async (req: unknown, res: RES): Promise<void> => {
      try {
        const content: unknown = await this.getContent(req);

        this.handleSuccess(res, content);
      } catch (error: unknown) {
        this.handleError(res, error);
      };
    };
  };

  private server: Server = undefined;
  private url: string = undefined;
};

