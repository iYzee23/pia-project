import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Cas = new Schema({
    ucenik: {type: String},
    nastavnik: {type: String},
    predmet: {type: String},
    datum_vreme_start: {type: String},
    datum_vreme_kraj: {type: String},
    kratak_opis: {type: String},
    dupli_cas: {type: Boolean},
    trajanje: {type: Number},
    status: {type: String},
    tekst: {type: String},
    ocena_ucenik: {type: Number},
    komentar_ucenik: {type: String},
    ocena_nastavnik: {type: Number},
    komentar_nastavnik: {type: String}
});

export default mongoose.model("Cas", Cas, "casovi");