import express from "express";

export const router = express.Router();

router.get("/router", (req, res) => {
    res.send("Hello World...");
});
