import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("Hello World! 123 456");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});