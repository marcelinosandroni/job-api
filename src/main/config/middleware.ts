import { Express } from "express";
import cors from "../middlewares/cors";
import json from "../middlewares/json";

export const setupMiddleWares = (app: Express) => {
  app.use(json);
  app.use(cors);
};
