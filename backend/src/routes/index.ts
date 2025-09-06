import express from "express";
import { helloRouter } from "./hello";

export const router = express.Router();

router.use("/hello", helloRouter);
