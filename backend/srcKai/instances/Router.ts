import Middleware from "../middlewares/Middleware.js";

/**
 * type of express();
 */
export default interface Router {
  use(middleware: Middleware): void;
  listen(port: number, callback: () => void): void;
  get(url: string, ...middleware: (Middleware | Router )[]): void;
  post(url: string, ...middleware: (Middleware | Router)[]): void;
};

