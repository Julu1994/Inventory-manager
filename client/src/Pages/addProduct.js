import "./addProduct.scss";
import React from "react";
import { TextField, Typography, Badge } from "@mui/material";
import { Button, IconButton, MenuItem } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { storage } from "../Storage/fireStorage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ImageIcon from "@mui/icons-material/Image";
import toast from "react-hot-toast";
import { type } from "./inputOption";
import { catagory } from "./inputOption";

const AddProduct = () => {
    const [types, setTypes] = React.useState("regular");
    const [catagories, setCatagories] = React.useState("fruits");
    const [name, setName] = React.useState("");
    const [details, setDetails] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [quantity, setQuantity] = React.useState(0);
    const [location, setLocation] = React.useState("");
    const [url, setUrl] = React.useState("");

    const fileHandler = (event) => {
        const imgFile = event.target.files[0];
        const imgRef = ref(storage, `Images/${imgFile.name}`);
        const uploadTask = uploadBytesResumable(imgRef, imgFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                toast.success(`Upload completed ${progress} %`);
            },
            () => {
                toast.error("Error! Something went wrong");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                });
            }
        );
    };

    const handleTypes = (event) => {
        setTypes(event.target.value);
    };
    const handleCatagories = (event) => {
        setCatagories(event.target.value);
    };
    const addProduct = async (event) => {
        event.preventDefault();
        const newProduct = {
            name: name ? name : undefined,
            details: details ? details : undefined,
            price: price ? price : undefined,
            quantity: quantity ? quantity : undefined,
            location: location ? location : undefined,
            type: types ? types : undefined,
            catagory: catagories ? catagories : undefined,
            url: url ? url : undefined,
        };
        try {
            await axios.post("http://localhost:4000/", newProduct);
            setName("");
            setDetails("");
            setPrice("");
            setQuantity("");
            setLocation("");
            setUrl("");
            toast.success("Successfully added the item");
        } catch {
            toast.error("Error! Something went wrong");
        }
    };

    return (
        <div className="add">
            <div className="add-header">
                <Typography gutterBottom variant="h4" color="text.secondary">
                    Add new product
                </Typography>
            </div>
            <form onSubmit={addProduct} className="add-form">
                <div>
                    <TextField
                        sx={{ width: "95%" }}
                        id="standard-basic"
                        label="Product Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Details"
                        variant="standard"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Price"
                        variant="standard"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Quantity"
                        variant="standard"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ width: "95%", mt: "1rem" }}
                        id="standard-basic"
                        label="Location"
                        variant="standard"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                            onClick={() => setUrl("")}>
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
                    <Button
                        type="submit"
                        variant="outlined"
                        endIcon={<SendIcon />}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
