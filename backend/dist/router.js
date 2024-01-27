"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const ZRouter = express_1.default.Router();
ZRouter
    .route("/login")
    .post((req, res) => new controller_1.ZController().login(req, res));
ZRouter
    .route("/loginAdmin")
    .post((req, res) => new controller_1.ZController().loginAdmin(req, res));
exports.default = ZRouter;
