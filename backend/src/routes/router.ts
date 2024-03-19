import { Router } from "express";
import { authRouter } from "./AuthRouter";
import { postRouter } from "./PostRouter";

export const router = Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);