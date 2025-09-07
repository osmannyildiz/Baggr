import express from "express";
import * as controller from "../controllers/bags";

export const bagsRouter = express.Router();

bagsRouter.route("/").get(controller.getBags).post(controller.createBag);
