import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Ucenik = new Schema({
    kor_ime: {type: String},
    tip_skole: {type: String},
    tr_razred: {type: String},
    ocena: {type: Number},
    br_ocena: {type: Number}
});

export default mongoose.model("Ucenik", Ucenik, "ucenici");