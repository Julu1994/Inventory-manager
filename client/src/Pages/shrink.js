import "./shrink.scss";
import { Fab, TextField, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { shrinkReasons } from "../Components/inputOption";
import { config } from "../config";

const Shrink = () => {
    const [item, setItem] = React.useState(0);
    const [reason, setReason] = React.useState("quality");
    const existingItem = useSelector((state) => state.editProductInfo.data);

    const handleChange = (event) => {
        setReason(event.target.value);
    };

    const product = {
        quantity: item,
    };
    const shrinkItem = async (event) => {
        event.preventDefault();
        try {
            if (item < 1) {
                toast.error("Please write a valid number");
            } else {
                await axios.put(
                    `${config.SERVER_LINK}/products/shrink-products/${existingItem.id}`,
                    product
                );
                toast.success(`${item} items have been removed`);
                setItem(0);
                setReason("quality");
            }
        } catch {
            toast.error("Error! Something went wrong");
        }
    };
    return (
        <div className="shrink">
            <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", mt: "4rem" }}>
                Shrink
            </Typography>
            <div className="shrink-input">
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
                <div>
                    <TextField
                        sx={{ mt: "2rem" }}
                        id="standard-select-currency-native"
                        select
                        label="Cause of shrinkage"
                        value={reason}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="standard">
                        {shrinkReasons.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div className="shrink-button">
                    <Fab
                        onClick={shrinkItem}
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add">
                        <RemoveCircleOutlineIcon sx={{ mr: 1 }} />
                        Shrink Item
                    </Fab>
                </div>
            </div>
        </div>
    );
};

export default Shrink;
