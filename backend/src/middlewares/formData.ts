import express from "express";
import composeMiddlewares from "./composeMiddlewares.js";
import { REQ as PREQ, RES } from "../apis/API.js";

export interface REQ extends PREQ {
  query: unknown;
  body: unknown;
};

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

