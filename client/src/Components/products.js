import React from "react";
import ProductCard from "./productCard";
import axios from "axios";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../Redux/Features/productsSlice";

const Products = () => {
    const catagory = useSelector((state) => state.filter.catagory);
    const type = useSelector((state) => state.filter.type);
    const [a, setA] = React.useState(0);
    const [b, setB] = React.useState(18);
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.items);

    const productsDiscount = allProducts.filter((i) => {
        return i.type.toLowerCase().includes(type.toLowerCase());
    });

    const products = productsDiscount.filter((i) => {
        return i.catagory.toLowerCase().includes(catagory.toLowerCase());
    });

    const name = useSelector((state) => state.search.name);

    const filterByName = products.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase());
    });

    React.useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get("http://localhost:4000/");
            dispatch(productsAction.storeProducts(res.data));
        };
        getProducts();
    }, [dispatch]);

    return (
        <>
            {filterByName.slice(a, b).map((item) => {
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

            {filterByName.length > 18 && (
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "2rem",
                    }}>
                    <ButtonGroup aria-label="outlined button group">
                        <Button
                            onClick={() => {
                                setA(0);
                                setB(18);
                            }}>
                            1
                        </Button>
                        <Button
                            onClick={() => {
                                setA(19);
                                setB(36);
                            }}>
                            2
                        </Button>
                        <Button
                            onClick={() => {
                                setA(37);
                                setB(54);
                            }}>
                            3
                        </Button>
                    </ButtonGroup>
                </div>
            )}
        </>
    );
};

export default Products;
