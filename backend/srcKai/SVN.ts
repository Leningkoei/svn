import DatabaseProvider from "./instances/DatabaseProvider.js";
import Server from "./instances/Server.js";
import ServerProvider from "./instances/ServerProvider.js";

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
    await DatabaseProvider.initialize();
    ServerProvider.initialize();
  };
  private setListener(): void {
  };
  private setServer(): void {
    const server: Server = ServerProvider.getServer();

    server.listen(this.port, () => {
      console.log(
        "[Main] Backend server is running at",
        `http://127.0.0.1:${this.port}/server.`
      );
    });
  };
};

