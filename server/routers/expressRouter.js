import express from "express";
import { ProductModel } from "../models/productModel.js";
export const router = express.Router();

router.post("/", (req, res) => {
    const { id, name, details, price, quantity, location, catagory, type } =
        req.body;
    const newProduct = new ProductModel({
        id,
        name,
        details,
        price,
        quantity,
        location,
        catagory,
        type,
    });
    newProduct.save();
});

router.get("/router", (req, res) => {
    res.send("Hello World...");
});
