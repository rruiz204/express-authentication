import { type Response } from "express";

async function ExceptionHandler(res: Response, logig: () => Promise<void>) {
  try {
    await logig();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default ExceptionHandler;