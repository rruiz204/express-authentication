import { type Request, type Response, type NextFunction } from "express";
import Tokens from "../utils/tokens";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).json({message: "Unauthorized"})
  
  const token = authorization?.split(" ")[1];
  const verified = await Tokens.verify(token as string);

  if (!verified) res.status(401).json({message: "Invalid token"});
  else {
    res.locals.payload = verified;
    next();
  }
};