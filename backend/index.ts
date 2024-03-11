import express, { type Request, type Response } from "express";
import bodyParser from "body-parser";
import { router } from "./src/routes/router";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);;
});