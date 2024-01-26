import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Admin = new Schema({
    kor_ime: {type: String}
});

export default mongoose.model("Admin", Admin, "admini");