import express from "express";
import Middleware from "./Middleware.js";
import Router from "../instances/Router.js";

export default (...middlewares: Middleware[]): Router => {
  const router: Router = express.Router();

  middlewares.forEach((middleware: Middleware) => router.use(middleware));

  return router;
};

