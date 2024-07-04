import { Router } from "express";
import AuthController from "../controllers/AuthController";
import ValidationMiddleware from "../middlewares/ValidationMiddleware";

import {
  LocalAuthSchema,
  SocialAuthSchema,
  RegisterSchema
} from "../../validations/AuthenticationSchemas";

const AuthRouter = Router();

AuthRouter.post("/register", ValidationMiddleware(RegisterSchema), AuthController.register);
AuthRouter.post("/login", ValidationMiddleware(LocalAuthSchema), AuthController.login);
AuthRouter.post("/social", ValidationMiddleware(SocialAuthSchema), AuthController.social);

export default AuthRouter;