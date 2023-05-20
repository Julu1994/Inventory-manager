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
import { config } from "../config";

const ProductCard = (props) => {
    const {
        name,
        details,
        quantity,
        price,
        location,
        catagory,
        type,
        id,
        url,
    } = props;
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
        await axios.delete(
            `${config.SERVER_LINK}/products/remove-products/${id}`
        );
        const getProducts = async () => {
            const res = await axios.get(
                `${config.SERVER_LINK}/products/get-products`
            );
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
                url,
            })
        );
        // navigate("/add-product");
    };
    const discountColor = type === "Discount" ? "red" : "text.secondary";
    return (
        <Card sx={{ maxWidth: 145, mt: "1.4rem", ml: "auto", mr: "auto" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="80"
                    image={url}
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
                        color={discountColor}>
                        Price: {price.toFixed(2)} Kr.
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
