import express from "express";
import * as controller from "../controllers/hello";

export const helloRouter = express.Router();

helloRouter.route("/").get(controller.hello);
