import { Box, Fab, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { config } from "../config";
const Inbound = () => {
    const [item, setItem] = React.useState(0);
    const existingItem = useSelector((state) => state.editProductInfo.data);

    const productQuantity = {
        quantity: item,
    };
    console.log(existingItem.id);
    const inboundItem = async (event) => {
        event.preventDefault();
        try {
            if (item < 1) {
                toast.error("Please write a valid number");
            } else {
                await axios.put(
                    `${config.SERVER_LINK}/products/inbound-products/${existingItem.id}`,
                    productQuantity
                );
                toast.success(`${item} items have been added`);
                setItem(0);
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
                Inbound
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
                <Box
                    sx={{
                        margin: "2rem auto",
                        width: "max-content",
                    }}
                >
                    <Fab
                        onClick={inboundItem}
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        Add Item
                    </Fab>
                </Box>
            </Box>
        </div>

    );
};

export default Inbound;
