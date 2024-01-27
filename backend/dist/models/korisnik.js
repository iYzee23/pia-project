"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Korisnik = new Schema({
    kor_ime: { type: String },
    lozinka: { type: String },
    tip: { type: String },
    bezb_pitanje: { type: String },
    bezb_odgovor: { type: String },
    ime: { type: String },
    prezime: { type: String },
    pol: { type: String },
    adresa: { type: String },
    telefon: { type: String },
    email: { type: String },
    prof_slika: { type: String },
    zahtev_status: { type: String }
});
exports.default = mongoose_1.default.model("Korisnik", Korisnik, "korisnici");
