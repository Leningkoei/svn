/**
 * type of express();
 */
export default interface Server {
  listen(port: number, callback: () => void): void;
  use(middleware: (...params: unknown[]) => void): void;
};

