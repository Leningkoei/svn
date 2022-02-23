import express from "express";
import composeMiddlewares from "./composeMiddlewares.js";
import REQ from "../apis/REQ.js";
import RES from "../apis/RES.js";

/**
 * A middleware to handle form data.
 */
export default composeMiddlewares(
  express.json(),
  (req: REQ, res: RES, next: () => void): void => {
    req.query = req.body;

    next();
  }
);

