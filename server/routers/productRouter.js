import express from "express";
import { auth } from "../middleware/auth.js";
import { ProductModel } from "../models/productModel.js";
export const router = express.Router();

//Get Data
router.get("/", auth, async (req, res) => {
    try {
        const data = await ProductModel.find({ user: req.user });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Not found data!" });
    }
});

//Post Data
router.post("/", auth, async (req, res) => {
    try {
        const {
            name,
            details,
            price,
            quantity,
            location,
            catagory,
            type,
            url,
        } = req.body;

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
            url,
            user: req.user,
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(500).send();
    }
});

// Delete Data
router.delete("/:id", auth, async (req, res) => {
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

        if (existedProduct.user.toString() !== req.user) {
            return res.status(400).json({
                error: "Error! Unauthorised action",
            });
        }

        await existedProduct.delete();
        res.json(existedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error! Something went wrong" });
    }
});

//Update data
router.put("/:id", auth, async (req, res) => {
    try {
        const {
            name,
            details,
            price,
            quantity,
            location,
            catagory,
            type,
            url,
        } = req.body;
        const dataID = req.params.id;
        if (!name || !price || !quantity || !type) {
            return res.status(400).json({
                error: "Required field is missing",
            });
        }

        if (!dataID)
            return res.status(400).json({
                error: "Error! Something went wrong",
            });

        const oldData = await ProductModel.findById(dataID);

        if (!oldData)
            return res.status(400).json({
                error: "Error! Something went wrong",
            });
        if (oldData.user.toString() !== req.user) {
            return res.status(400).json({
                error: "Error! Unauthorised action",
            });
        }

        oldData.name = name;
        oldData.details = details;
        oldData.price = price;
        oldData.quantity = quantity;
        oldData.location = location;
        oldData.catagory = catagory;
        oldData.type = type;
        oldData.url = url;

        const savedData = await oldData.save();
        res.json(savedData);
    } catch (error) {
        res.status(500).json({ errore: "Error!! Something went worong" });
    }
});

router.get("/router", (req, res) => {
    res.send("Hello World...");
});
