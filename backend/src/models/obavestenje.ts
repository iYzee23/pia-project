import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Obavestenje = new Schema({
    cas: {type: String},
    tekst: {type: String},
    neprocitano: {type: Boolean}
});

export default mongoose.model("Obavestenje", Obavestenje, "obavestenja");