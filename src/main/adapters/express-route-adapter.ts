import { Request, Response } from "express";
import { Controller } from "presentation/controllers/controller";

export const adaptExpressRoute = (controler: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest = {
      body: request.body,
    };
    const httpResponse = await controler.handle(httpRequest);
    return response.status(httpResponse.statusCode).send(httpResponse.body);
  };
};
