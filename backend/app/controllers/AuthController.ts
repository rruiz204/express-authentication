import { type Request, type Response } from "express";
import AuthService from "../services/AuthService";
import Tokens from "../utils/tokens";

const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.createUser(req.body);
    const token = await Tokens.create({ id: user.id });
    res.status(200).json({ data: { jwt: token, type: "Bearer" } });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.loginUser(req.body);
    const token = await Tokens.create({ id: user.id });
    res.status(200).json({ data: { jwt: token, type: "Bearer" } });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const AuthController = { register, login };
export default AuthController;