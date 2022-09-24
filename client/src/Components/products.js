import React from "react";
import ProductCard from "./productCard";
import axios from "axios";
import { Grid } from "@mui/material";

const Products = () => {
    const [products, setProducts] = React.useState([]);
    const getProducts = async () => {
        const res = await axios.get("http://localhost:4000/");
        setProducts(res.data);
    };
    React.useEffect(() => {
        getProducts();
    }, []);
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
                        />
                    </Grid>
                );
            })}
        </>
    );
};

export default Products;
