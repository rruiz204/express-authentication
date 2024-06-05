import { type Response } from "express";

async function ExceptionHandler(res: Response, action: () => any) {
  try {
    const response = action();
    if (response instanceof Promise) await response;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default ExceptionHandler;