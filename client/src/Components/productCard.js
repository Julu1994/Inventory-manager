import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editActions } from "../Redux/Features/toggleSlice";
import { editDataAction } from "../Redux/Features/editDataSlice";
import CardAction from "./SubComponents/CardAction";
import Notiflix from "notiflix";
import { productsAction } from "../Redux/Features/productsSlice";

const ProductCard = (props) => {
    const { name, details, quantity, price, location, catagory, type, id } =
        props;
    const dispatch = useDispatch();

    const deleteConfirm = () => {
        Notiflix.Confirm.show(
            "Delete Confirm",
            "Are you sure about deleting the product?",
            "Delete",
            "Cancel",
            function okCb() {
                deleteProduct();
            },

            {
                width: "20rem",
                borderRadius: "8px",
            }
        );
    };
    const deleteProduct = async () => {
        await axios.delete(`http://localhost:4000/${id}`);
        const getProducts = async () => {
            const res = await axios.get("http://localhost:4000/");
            dispatch(productsAction.storeProducts(res.data));
        };
        getProducts();
    };
    const editProduct = () => {
        dispatch(editActions.editToggle());
        dispatch(
            editDataAction.editProduct({
                name,
                details,
                quantity,
                price,
                location,
                id,
                catagory,
                type,
            })
        );
        // navigate("/add-product");
    };
    return (
        <Card sx={{ maxWidth: 145, mt: "1rem" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="80"
                    image="https://firebasestorage.googleapis.com/v0/b/mychat-46b79.appspot.com/o/Portfolio%2FecoomerceIMG.png?alt=media&token=475daa19-7de0-4346-bc89-dff5f8a0d1f5"
                    alt="green iguana"
                />
                <CardContent sx={{ margin: "0", padding: "0" }}>
                    <Typography
                        sx={{ pl: ".5rem" }}
                        gutterBottom
                        variant="body2"
                        color="text.secondary">
                        {name}
                    </Typography>
                    <Typography
                        sx={{ pl: ".5rem" }}
                        variant="body2"
                        color="text.secondary">
                        Quantity: {quantity}
                    </Typography>
                    <Typography
                        sx={{ pl: ".5rem" }}
                        variant="body2"
                        color="text.secondary">
                        Price: {price}.00 Kr.
                    </Typography>
                    <Typography
                        sx={{ pl: ".5rem" }}
                        variant="body2"
                        color="text.secondary">
                        Location: {location}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
                sx={{
                    margin: "0",
                    padding: "0",
                    justifyContent: "end",
                }}>
                <CardAction editItem={editProduct} deleteItem={deleteConfirm} />
            </CardActions>
        </Card>
    );
};

export default ProductCard;
