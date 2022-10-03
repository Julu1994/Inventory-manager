import "./discount.scss";
import { Fab, TextField, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const Discount = () => {
    const [parcentage, setParcentage] = React.useState(0);
    const existingItem = useSelector((state) => state.editProductInfo.data);
    const discountAmout = (existingItem.price / 100) * parcentage;
    const endPrice = parseInt(existingItem.price) - parseInt(discountAmout);

    const product = {
        name: existingItem.name,
        details: existingItem.details,
        price: endPrice,
        quantity: existingItem.quantity,
        location: existingItem.location,
        type: "Discount",
        catagory: existingItem.catagory,
        url: existingItem.url,
    };
    const handleDiscount = async (event) => {
        event.preventDefault();
        try {
            if (parcentage < 1) {
                toast.error("Please write a valid number");
            } else {
                await axios.put(
                    `https://inventory-manager-jewel.netlify.app/${existingItem.id}`,
                    product
                );
                toast.success(
                    `${parcentage} % discount on ${existingItem.name}`
                );
                setParcentage(0);
            }
        } catch {
            toast.error("Error! Something went wrong");
        }
    };
    return (
        <div className="discount">
            <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", mt: "4rem" }}>
                Make a discount
            </Typography>
            <div className="discount-input">
                <TextField
                    value={parcentage}
                    onChange={(e) => setParcentage(e.target.value)}
                    sx={{ width: "100%}" }}
                    id="standard-number"
                    label="Parcentage of discount"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <div className="discount-button">
                    <Fab
                        onClick={handleDiscount}
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add">
                        <RemoveCircleOutlineIcon sx={{ mr: 1 }} />
                        Execute Discount
                    </Fab>
                </div>
            </div>
        </div>
    );
};

export default Discount;
