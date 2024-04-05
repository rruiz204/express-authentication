import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const postRouter = Router();
postRouter.use(AuthMiddleware);

postRouter.get("/all", PostController.all);
postRouter.post("/create", PostController.create);
postRouter.put("/update", PostController.update);
postRouter.delete("/remove", PostController.remove);