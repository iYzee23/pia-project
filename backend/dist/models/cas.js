"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Cas = new Schema({
    id: { type: String },
    ucenik: { type: String },
    nastavnik: { type: String },
    predmet: { type: String },
    datum_vreme: { type: String },
    kratak_opis: { type: String },
    dupli_cas: { type: Boolean },
    status: { type: String },
    tekst: { type: String },
    ocena_ucenik: { type: Number },
    komentar_ucenik: { type: String },
    ocena_nastavnik: { type: Number },
    komentar_nastavnik: { type: String }
});
exports.default = mongoose_1.default.model("Cas", Cas, "casovi");
