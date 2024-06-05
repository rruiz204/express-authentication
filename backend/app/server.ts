import express from "express";
import router from "./http/routers/router";
import bodyParser from "body-parser";
import morgan from "morgan";
import * as fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
const origins = ["http://localhost:5173"];
const options: cors.CorsOptions = { origin: origins };
app.use(cors(options));

// Logging
const logStream = fs.createWriteStream("./express.log", { flags: "a" });
app.use(morgan("[:date[web]] ':method/:status - :url - HTTP/:http-version'", { stream: logStream }));

// Routing
app.use("/api", router);

// RUN
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

export default app;