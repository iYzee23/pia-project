import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Cas = new Schema({
    id: {type: String},
    ucenik: {type: String},
    nastavnik: {type: String},
    predmet: {type: String},
    datum_vreme: {type: String},
    kratak_opis: {type: String},
    dupli_cas: {type: Boolean},
    status: {type: String},
    tekst: {type: String},
    ocena_ucenik: {type: Number},
    komentar_ucenik: {type: String},
    ocena_nastavnik: {type: Number},
    komentar_nastavnik: {type: String}
});

export default mongoose.model("Cas", Cas, "casovi");