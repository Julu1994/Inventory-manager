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
        value: "regular",
        label: "Regular",
    },
    {
        value: "discount",
        label: "Discount",
    },
];
const catagory = [
    {
        value: "fruits",
        label: "Fruits",
    },
    {
        value: "vegetables",
        label: "Vegetables",
    },
    {
        value: "drinks",
        label: "Drinks",
    },
    {
        value: "bread",
        label: "Bread",
    },
    {
        value: "dairy",
        label: "Dairy",
    },
];

const AddProduct = () => {
    const [types, setTypes] = React.useState("regular");
    const [catagories, setCatagories] = React.useState("fruits");

    const handleTypes = (event) => {
        setTypes(event.target.value);
    };
    const handleCatagories = (event) => {
        setCatagories(event.target.value);
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
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Details"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Price"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Quantity"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Location"
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Catagory"
                        select
                        variant="standard"
                        value={catagories}
                        onChange={handleCatagories}>
                        {catagory.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        select
                        label="Type"
                        variant="standard"
                        value={types}
                        onChange={handleTypes}>
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
