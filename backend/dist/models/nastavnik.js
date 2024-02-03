"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Nastavnik = new Schema({
    kor_ime: { type: String },
    cv_pdf: { type: String },
    predmeti: { type: [String] },
    uzrast: { type: [String] },
    culi_sajt: { type: String },
    nedostupnost: { type: [String] },
    ocena: { type: Number },
    br_ocena: { type: Number }
});
exports.default = mongoose_1.default.model("Nastavnik", Nastavnik, "nastavnici");
