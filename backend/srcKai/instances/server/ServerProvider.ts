import cors from "cors";
import express from "express";
import Server from "./Server.js";
import Provider from "../Provider.js";

interface IServerProvider extends Provider {
  /**
   * [Static] [Override]
   */
  initialize(): void;
  /**
   * [Errorable] [Static] [Override]
   */
  get(): Server;
};

export default class ServerProvider {
  /**
   * [Static] [Override]
   */
  public initialize(): void {
    if (ServerProvider.instance) {
      console.warn("[Server] ServerProvider has been initialized!");
    } else {
      ServerProvider.instance = new ServerProvider();
    };
  };
  /**
   * [Errorabel] [Static] [Override]
   */
  public get(): Server {
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

