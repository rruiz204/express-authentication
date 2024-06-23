import { type Request, type Response } from "express";

type Logic = (req: Request) => Promise<{
  status?: number;
  headers?: Record<string, string>;
  data: any;
}>;

function RequestHandler(logic: Logic) {
  return async (req: Request, res: Response) => {
    try {
      const response = await logic(req);
      res.status(response.status ?? 200).json({ data: response.data });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    };
  };
};

export default RequestHandler;