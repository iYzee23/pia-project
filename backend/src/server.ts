import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import ZRouter from './router';

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/baza");
const connection = mongoose.connection;
connection.once("open", () => console.log("DB connection ok"));

const router = express.Router();
router.use("/baza", ZRouter);

app.use("/", router);
app.listen(4000, () => console.log("Express server running on port 4000"));