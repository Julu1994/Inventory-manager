import "./inbound.scss";
import { Fab, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const Inbound = () => {
    const [item, setItem] = React.useState(0);
    const existingItem = useSelector((state) => state.editProductInfo.data);
    const totalItem = parseInt(item) + parseInt(existingItem.quantity);

    const product = {
        name: existingItem.name,
        details: existingItem.details,
        price: existingItem.price,
        quantity: totalItem,
        location: existingItem.location,
        type: existingItem.type,
        catagory: existingItem.catagory,
        url: existingItem.url,
    };
    const inboundItem = async (event) => {
        event.preventDefault();
        try {
            if (item < 1) {
                toast.error("Please write a valid number");
            } else {
                await axios.put(
                    `https://inventory-manager-production.up.railway.app/${existingItem.id}`,
                    product
                );
                toast.success(`${item} items have been added`);
                setItem(0);
            }
        } catch {
            toast.error("Error! Something went wrong");
        }
    };
    return (
        <div className="inbound">
            <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", mt: "4rem" }}>
                Inbound
            </Typography>
            <div className="inbound-input">
                <TextField
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    sx={{ width: "100%}" }}
                    id="standard-number"
                    label="Number of items"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <div className="inbound-button">
                    <Fab
                        onClick={inboundItem}
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add">
                        <AddIcon sx={{ mr: 1 }} /> Add Item
                    </Fab>
                </div>
            </div>
        </div>
    );
};

export default Inbound;
