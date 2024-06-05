import { type Request, type Response, type NextFunction } from "express";
import Tokens from "../../utils/tokens";

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ error: "" });

  const verified = await Tokens.verify(token);
  if (verified) return res.status(403).json({ error: "" });

  next();
};

export default AuthMiddleware;