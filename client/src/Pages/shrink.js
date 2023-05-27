import { Box, Fab, TextField, Typography } from "@mui/material";
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
        <div>
            <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", mt: "4rem" }}
            >
                Shrink
            </Typography>
            <Box
                sx={{
                    width: { xs: "90%", sm: "50%", md: "30%", lg: "20%" },
                    margin: "3rem auto",
                }}
            >
                <TextField
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    sx={{ width: "100%" }}
                    id="standard-number"
                    label="Number of items"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <TextField
                    sx={{ mt: "2rem", width: "100%" }}
                    id="standard-select-currency-native"
                    select
                    label="Cause of shrinkage"
                    value={reason}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant="standard"
                >
                    {shrinkReasons.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <Box
                    sx={{
                        margin: "2rem auto",
                        width: "max-content",
                    }}
                >
                    <Fab
                        onClick={shrinkItem}
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                    >
                        <RemoveCircleOutlineIcon sx={{ mr: 1 }} />
                        Shrink Item
                    </Fab>
                </Box>
            </Box>
        </div>

    );
};

export default Shrink;
