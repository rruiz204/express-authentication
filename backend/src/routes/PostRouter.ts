import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const postRouter = Router();
postRouter.use(AuthMiddleware);

postRouter.get("/all", PostController.all);