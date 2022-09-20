import express from "express";

export const router = express.Router();

router.post("/", (req, res) => {
    const { id, name, details, price, quantity, location, catagory, type } =
        req.body;
    console.log(id, name, details, price, quantity, location, catagory, type);
});

router.get("/router", (req, res) => {
    res.send("Hello World...");
});
