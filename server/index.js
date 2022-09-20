import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/expressRouter.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.listen(4000, () => {
    console.log("server is up and running on port 4000");
});
app.use(express.json());
app.use("/", router);
mongoose.connect(process.env.DB_LINK, (err) => {
    if (err) return console.error(err);
    console.log("Succcessfully connected to MongoDB");
});
