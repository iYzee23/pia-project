import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Korisnik = new Schema({
    kor_ime: {type: String},
    lozinka: {type: String},
    tip: {type: String},
    bezb_pitanje: {type: String},
    bezb_odgovor: {type: String},
    ime: {type: String},
    prezime: {type: String},
    pol: {type: String},
    adresa: {type: String},
    telefon: {type: String},
    email: {type: String},
    prof_slika: {type: String},
    zahtev_status: {type: String}
});

export default mongoose.model("Korisnik", Korisnik, "korisnici");