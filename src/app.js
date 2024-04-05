import express from "express";
import cors from "cors";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const upload = multer();

app.use(upload.any());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
// importing routes
import routes_v1 from "./routes/index.js";

// defining routes
app.use("/api/v1/", routes_v1);

export default app;
