import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/productRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { route } from "./routes/index.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(cookieParser());
app.use("/", router);
app.use("/api/v1", route);
mongoose.connect(process.env.DB_LINK, (err) => {
    if (err) return console.error(err);
    console.log("Succcessfully connected to MongoDB");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
});
