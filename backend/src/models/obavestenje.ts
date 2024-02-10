import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Obavestenje = new Schema({
    cas: {type: String},
    tekst: {type: String},
    neprocitano: {type: Boolean},
    datum_vreme: {type: String}
});

export default mongoose.model("Obavestenje", Obavestenje, "obavestenja");