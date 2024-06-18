import { type Request, type Response, type NextFunction } from "express";
import vine from "@vinejs/vine";

function ValidationMiddleware(schema: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const compile = vine.compile(schema);

    try {
      await compile.validate(req.body);
      next()
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
};

export default ValidationMiddleware;