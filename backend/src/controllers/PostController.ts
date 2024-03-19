import { type Request, type Response } from "express";

const all = async (req: Request, res: Response) => {
  console.log(res.locals);
  res.status(200).json({message: "Not problems"});
};

export const PostController = {
  all
};