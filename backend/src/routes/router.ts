import { Router } from "express";
import { authRouter } from "./AuthRouter";

export const router = Router();

router.use("/auth", authRouter);