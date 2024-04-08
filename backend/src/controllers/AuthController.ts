import { type Request, type Response } from "express";
import AuthService from "../services/AuthService";

const register = async (req: Request, res: Response) => {
  try { 
    const user = await AuthService.createUser(req.body);
    res.status(200).json({ message: "Not problems", id: user.id });
  } catch (error: any) {
    res.status(500).json({ message: "Found problems", error: error.message });
  }
}

const AuthController = { register };
export default AuthController;