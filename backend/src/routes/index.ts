import express from "express";
import { bagsRouter } from "./bags";
import { helloRouter } from "./hello";

export const router = express.Router();

router.use("/bags", bagsRouter);
router.use("/hello", helloRouter);
