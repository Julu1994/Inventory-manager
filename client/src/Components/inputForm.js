import "./inputForm.scss";
import React from "react";
import { TextField, Typography, Badge } from "@mui/material";
import { Button, IconButton, MenuItem } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import { type } from "./inputOption";
import { catagory } from "./inputOption";
import { useSelector } from "react-redux";
const InputForm = (props) => {
    const {
        addProduct,
        editProduct,
        handleName,
        handleDetails,
        handlePrice,
        handleQuantity,
        handleLocation,
        handleCatagories,
        handleTypes,
        handleUrl,
        name,
        details,
        price,
        quantity,
        location,
        catagories,
        types,
        url,
        fileHandler,
    } = props;

    const toggle = useSelector((state) => state.toggleEdit.toggle);

    return (
        <div className="add">
            <div className="add-header">
                {!toggle ? (
                    <Typography
                        gutterBottom
                        variant="h4"
                        color="text.secondary">
                        Add new product
                    </Typography>
                ) : (
                    <Typography
                        gutterBottom
                        variant="h4"
                        color="text.secondary">
                        Edit Product
                    </Typography>
                )}
            </div>
            <form
                onSubmit={!toggle ? addProduct : editProduct}
                className="add-form">
                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        label="Product Name"
                        variant="standard"
                        value={name}
                        onChange={handleName}
                    />
                </div>

                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Details"
                        variant="standard"
                        value={details}
                        onChange={handleDetails}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Price"
                        variant="standard"
                        value={price}
                        onChange={handlePrice}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Quantity"
                        variant="standard"
                        value={quantity}
                        onChange={handleQuantity}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Location"
                        variant="standard"
                        value={location}
                        onChange={handleLocation}
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
                    {url && (
                        <IconButton
                            sx={{ mt: "1rem" }}
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            onClick={handleUrl}>
                            <Badge badgeContent={"X"} color="error">
                                <ImageIcon fontSize="large" color="secondary" />
                            </Badge>
                        </IconButton>
                    )}
                    {!url && (
                        <IconButton
                            sx={{ mt: "1rem" }}
                            color="primary"
                            aria-label="upload picture"
                            component="label">
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={fileHandler}
                            />

                            <AddPhotoAlternateIcon fontSize="large" />
                        </IconButton>
                    )}
                </div>
                <div style={{ textAlign: "center" }}>
                    {!toggle ? (
                        <Button
                            type="submit"
                            variant="outlined"
                            endIcon={<SendIcon />}>
                            Submit
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="outlined"
                            endIcon={<SendIcon />}>
                            Save Edit
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default InputForm;
