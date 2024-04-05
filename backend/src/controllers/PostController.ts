import { type Request, type Response } from "express";

const all = async (req: Request, res: Response) => {
  console.log(res.locals);
  res.status(200).json({message: "Not problems"});
};

const create = async (req: Request, res: Response) => {
  res.status(200).json({message: "Not Problems in Create Endpoint"})
};

const update = async (req: Request, res: Response) => {
  res.status(200).json({message: "Not Problems in Update Enpoint"});
};

const remove = async (req: Request, res: Response) => {
  res.status(200).json({message: "Not Problems in Remove Endpoint"});
};

export const PostController = {
  all, create, update, remove
};