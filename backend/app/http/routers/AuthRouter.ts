import { Router } from "express";
import AuthController from "../controllers/AuthController";
import ValidationMiddleware from "../middlewares/ValidationMiddleware";

import RegisterSchema from "../../validations/RegisterSchema";
import JwtAuthSchema from "../../validations/JwtAuthSchema";
import SocialAuthSchema from "../../validations/SocialAuthSchema";

const AuthRouter = Router();

AuthRouter.post("/register", ValidationMiddleware(RegisterSchema), AuthController.register);
AuthRouter.post("/login", ValidationMiddleware(JwtAuthSchema), AuthController.login);
AuthRouter.post("/social", ValidationMiddleware(SocialAuthSchema), AuthController.social);

export default AuthRouter;