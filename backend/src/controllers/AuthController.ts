import { type Request, type Response } from "express";
import { AuthService } from "../services/AuthService";
import { SignJWT, jwtVerify } from "jose";

const login = (req: Request, res: Response) => {
  res.json({message: "login page"});
};

const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.createUser(req.body);
    res.status(200).json({message: "Todo gud", user_id: user.id});
  } catch (error) {
    res.status(500).json({message: "Todo bad"});
  }
};

export const authController = {
  login, register
};