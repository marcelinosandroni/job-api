import { Router } from "express";
import { adaptExpressRoute } from "./../adapters/express-route-adapter";
import { SignUpController } from "presentation/controllers/signup/signup";

export default (router: Router): void => {
  const useCase = {};
  const validation = {};
  const controller = new SignUpController(useCase, validation);
  router.post("/signup", adaptExpressRoute(controller));
};
