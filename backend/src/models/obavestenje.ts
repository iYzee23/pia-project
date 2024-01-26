import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Obavestenje = new Schema({
    id: {type: String},
    cas: {type: String},
    neprocitano: {type: Boolean}
});

export default mongoose.model("Obavestenje", Obavestenje, "obavestenja");