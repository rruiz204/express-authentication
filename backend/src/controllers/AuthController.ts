import { type Request, type Response } from "express";
import { AuthService } from "../services/AuthService";

const login = (req: Request, res: Response) => {
  res.json({message: "login page"});
};

const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.createUser(req.body);
    res.json({message: "Tood gud", user_id: user.id});
  } catch (error) {
    res.json({message: "Todo bad"});
  }
};

export const authController = {
  login, register
};