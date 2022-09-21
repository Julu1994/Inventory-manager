import mongoose from "mongoose";

const productScema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        details: {
            type: String,
        },
        price: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        location: {
            type: String,
        },
        catagory: {
            type: String,
        },
        type: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const ProductModel = mongoose.model("model", productScema);
