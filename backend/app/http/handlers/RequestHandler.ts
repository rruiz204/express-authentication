import { type Request, type Response } from "express";
import ExceptionHandler from "./ExceptionHandler";

interface IResponse {
  status?: number;
  headers?: Record<string, string>;
  data: any;
}

type Logic = (req: Request) => Promise<IResponse>;

function RequestHandler(logic: Logic) {
  return async (req: Request, res: Response) => {

    await ExceptionHandler(res, async () => {
      const response: IResponse = await logic(req);
      res.status(response.status ?? 200).json({ data: response.data });
    });

  };
};

export default RequestHandler;