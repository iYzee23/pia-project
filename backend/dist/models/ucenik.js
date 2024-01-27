"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Ucenik = new Schema({
    kor_ime: { type: String },
    tip_skole: { type: String },
    tr_razred: { type: Number },
    ocena: { type: Number },
    br_ocena: { type: Number }
});
exports.default = mongoose_1.default.model("Ucenik", Ucenik, "ucenici");
