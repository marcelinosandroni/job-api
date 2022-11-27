import { Express, Router } from "express";
import { readdirSync } from "fs";
import { resolve } from "path";

export const setupRoutes = (app: Express) => {
  const router = Router();
  app.use("/api", router);
  const routesPath = resolve(__dirname, "..", "routes");
  try {
    readdirSync(routesPath).map(async (file) => {
      (await import(`${routesPath}/${file}`)).default(router);
    });
  } catch (error) {
    console.error(`No routes to setup`);
  }
};
