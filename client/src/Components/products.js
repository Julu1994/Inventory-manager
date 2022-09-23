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
    console.log(products);
    return (
        <>
            {products?.map((item) => {
                return (
                    <Grid item xs={6} lg={1.5} key={item._id}>
                        <ProductCard
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            quantity={item.quamtity}
                            location={item.location}
                        />
                    </Grid>
                );
            })}
        </>
    );
};

export default Products;
