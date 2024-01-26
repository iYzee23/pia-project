import express from "express";
import { ZController } from "./controller";

const ZRouter = express.Router();

ZRouter
    .route("/login")
    .post((req, res) => new ZController().login(req, res));

export default ZRouter;