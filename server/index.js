import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/expressRouter.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();

app.use(express.json());
app.use(
    cors({
        orgin: " http://localhost:3000",
    })
);
app.use("/", router);
mongoose.connect(process.env.DB_LINK, (err) => {
    if (err) return console.error(err);
    console.log("Succcessfully connected to MongoDB");
});
app.listen(4000, () => {
    console.log("server is up and running on port 4000");
});
