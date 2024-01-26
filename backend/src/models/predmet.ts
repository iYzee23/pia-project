import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Predmet = new Schema({
    naziv: {type: String},
    status: {type: String}
});

export default mongoose.model("Predmet", Predmet, "predmeti");