import { Express } from "express";
import cors from "cors";

export default (app: Express) => {
  const allowedOrigins = ["http:/localhost", "https://localhost"];
  app.use(cors({ origin: allowedOrigins }));
};
