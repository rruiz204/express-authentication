import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./src/routers/router";
import dotenv from "dotenv";
dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use("/api", router); 

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});