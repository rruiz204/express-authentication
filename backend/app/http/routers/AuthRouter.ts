import { Router } from "express";
import AuthController from "../controllers/AuthController";
import ValidationMiddleware from "../middlewares/ValidationMiddleware";

import RegisterSchema from "../../validations/RegisterSchema";
import LoginSchema from "../../validations/LoginSchema";

const AuthRouter = Router();

AuthRouter.post("/register", ValidationMiddleware(RegisterSchema), AuthController.register);
AuthRouter.post("/login", ValidationMiddleware(LoginSchema), AuthController.login);

AuthRouter.post("/github", AuthController.github);
AuthRouter.post("/google", AuthController.google);

export default AuthRouter;