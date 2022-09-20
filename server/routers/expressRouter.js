import express from "express";
import { ProductModel } from "../models/productModel.js";
export const router = express.Router();

//Get Data
router.get("/", async (req, res) => {
    try {
        const data = await ProductModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Not found data!" });
    }
});

//Post Data
router.post("/", async (req, res) => {
    try {
        const { name, details, price, quantity, location, catagory, type } =
            req.body;

        if (!name || !price || !quantity || !type) {
            return res
                .status(400)
                .json({ error: "Required input field is missing" });
        }

        const newProduct = new ProductModel({
            name,
            details,
            price,
            quantity,
            location,
            catagory,
            type,
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(500).send();
    }
});

// Delete Data
router.delete("/:id", async (req, res) => {
    try {
        const productID = req.params.id;

        if (!productID)
            return res.status(400).json({
                error: "Nothing to delete!",
            });

        const existedProduct = await ProductModel.findById(productID);

        if (!existedProduct)
            return res.status(400).json({
                error: "Sorry!!! not found anything to delete....",
            });

        await existedProduct.delete();
        res.json(existedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error! Something went wrong" });
    }
});

router.get("/router", (req, res) => {
    res.send("Hello World...");
});
