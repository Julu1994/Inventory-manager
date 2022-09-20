import express from "express";
import { router } from "./routers/expressRouter.js";
const app = express();

app.listen(4000, () => {
    console.log("server is up and running on port 4000");
});

app.use("/", router);
