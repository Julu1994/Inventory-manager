import React from "react";
import ProductCard from "./productCard";
import axios from "axios";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../Redux/Features/productsSlice";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);

    React.useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get("http://localhost:4000/");
            dispatch(productsAction.storeProducts(res.data));
        };
        getProducts();
    }, [dispatch]);
    return (
        <>
            {products?.map((item) => {
                return (
                    <Grid item xs={6} lg={2} key={item._id}>
                        <ProductCard
                            id={item._id}
                            details={item.details}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            location={item.location}
                            catagory={item.catagory}
                            type={item.type}
                            url={item.url}
                        />
                    </Grid>
                );
            })}
        </>
    );
};

export default Products;
