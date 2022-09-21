import "./addProduct.scss";
import React from "react";
import {
    Button,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";

const type = [
    {
        value: "Product type",
        label: "Regular",
    },
    {
        value: "Product type",
        label: "Discount",
    },
];

const AddProduct = () => {
    const [types, setTypes] = React.useState("regular");

    const handleChange = (event) => {
        setTypes(event.target.value);
    };

    return (
        <div className="add">
            <div className="add-header">
                <Typography gutterBottom variant="h4" color="text.secondary">
                    Add new product
                </Typography>
            </div>
            <form className="add-form">
                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        label="Product Name"
                        variant="standard"
                    />
                </div>

                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        label="Details"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        label="Price"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        label="Quantity"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        label="Location"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        label="Catagory"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        select
                        label="Select"
                        value={types}
                        variant="standard"
                        onChange={handleChange}
                        helperText="Please select type">
                        {type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label">
                        <input hidden accept="image/*" type="file" />
                        <AddPhotoAlternateIcon />
                    </IconButton>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button variant="outlined" endIcon={<SendIcon />}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
