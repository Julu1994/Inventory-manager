import mongoose from "mongoose";
const id = mongoose.Schema.Types.ObjectId;

const myScema = new mongoose.Schema(
    {
        id: {
            type: id,
        },
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
    },
    {
        timestamps: true,
    }
);

export const Model = mongoose.model("model", myScema);
