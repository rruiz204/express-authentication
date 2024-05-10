import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = Bun.env.PORT || 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
const origins = [""];
const options: cors.CorsOptions = { origin: origins };
app.use(cors(options));

// Logging
app.use(morgan("dev"));

// RUN
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});