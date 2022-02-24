import setListeners from "./apis/index.js";
import DatabaseProvider from "./instances/database/DatabaseProvider.js";
import Server from "./instances/server/Server.js";
import ServerProvider from "./instances/server/ServerProvider.js";
import TokenProvider from "./instances/token/TokenProvider.js";

export default class SVN {
  public constructor(port: number) {
    console.log("[Main] Perparing backend server...");

    this.port = port;
  };

  public async main(): Promise<void> {
    await this.initialize();
    this.setListener();
    this.setServer();
  };

  private port: number = undefined;

  private async initialize(): Promise<void> {
    await DatabaseProvider.prototype.initialize();
    ServerProvider.prototype.initialize();
    TokenProvider.prototype.initialize({ optionStr: "cnpnmslsb" });
  };
  private setListener(): void {
    setListeners();
  };
  private setServer(): void {
    const server: Server = ServerProvider.prototype.get();

    server.listen(this.port, () => {
      console.log(
        "[Main] Backend server is running at",
        `http://127.0.0.1:${this.port}/server.`
      );
    });
  };
};

