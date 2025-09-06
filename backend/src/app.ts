import cors from "cors";
import express from "express";
import fs from "fs";
import { router } from "./routes";

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static files
if (!fs.existsSync("static")) {
  fs.mkdirSync("static", { recursive: true });
}
app.use("/static", express.static("static"));

// Routes
app.use("/api", router);
