import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Nastavnik = new Schema({
    kor_ime: {type: String},
    cv_pdf: {type: String},
    predmeti: {type: [String]},
    uzrast: {type: [String]},
    culi_sajt: {type: String},
    nedostupnost: {type: [String]},
    ocena: {type: Number},
    br_ocena: {type: Number}
});

export default mongoose.model("Nastavnik", Nastavnik, "nastavnici");