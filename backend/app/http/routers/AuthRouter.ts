import { Router } from "express";
import AuthController from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);

AuthRouter.get("/github", AuthController.github);
AuthRouter.get("/google", AuthController.google);

export default AuthRouter;