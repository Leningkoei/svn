import cors from "cors";
import express from "express";
import Server from "../Server.js";

export default class ServerProvider {
  public static initialize(): void {
    if (ServerProvider.instance) {
      console.warn("[Server] ServerProvider has been initialized!");
    } else {
      ServerProvider.instance = new ServerProvider();
    };
  };
  public static getServer(): Server {
    if (ServerProvider.instance) {
      return ServerProvider.instance.server;
    } else {
      throw new Error("[Server] ServerProvider must be initialize!");
    };
  };

  private static instance: ServerProvider = undefined;

  private constructor() {
    this.server = express();
    this.server.use(cors());
  };

  private server: Server = undefined;
};

