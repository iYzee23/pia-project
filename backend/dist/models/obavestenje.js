"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Obavestenje = new Schema({
    cas: { type: String },
    tekst: { type: String },
    neprocitano: { type: Boolean },
    datum_vreme: { type: String }
});
exports.default = mongoose_1.default.model("Obavestenje", Obavestenje, "obavestenja");
