import { type Request, type Response } from "express";
import ExceptionHandler from "./ExceptionHandler";

interface IResponse {
  status?: number;
  headers?: Record<string, string>;
  data: any;
}

type Logic = (req: Request) => Promise<IResponse> | IResponse;

function RequestHandler(logic: Logic) {
  return async (req: Request, res: Response) => {

    await ExceptionHandler(res, async () => {
      const output = logic(req);

      const response: IResponse = (output instanceof Promise) ? await output : output;

      res.status(response.status ?? 200).json({ data: response.data });
    });

  };
};

export default RequestHandler;