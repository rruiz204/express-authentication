import { Router } from "express";
import { authController } from "../controllers/AuthController";

export const authRouter = Router();

authRouter.get('/login', authController.login);
authRouter.post('/register', authController.register);