import React from "react";
import ProductCard from "./productCard";
import axios from "axios";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../Redux/Features/productsSlice";
import { config } from "../config";

const Products = () => {
    const catagory = useSelector((state) => state.filter.catagory);
    const type = useSelector((state) => state.filter.type);
    const deviceWidth = () => {
        return window.innerWidth < 900;
    };
    const [a, setA] = React.useState(0);
    const [b, setB] = React.useState(deviceWidth() ? 10 : 18);
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.items);

    const productsDiscount = allProducts.filter((item) =>
        item.type.toLowerCase().includes(type.toLowerCase())
    );

    const products = productsDiscount?.filter((item) =>
        item.catagory.toLowerCase().includes(catagory.toLowerCase())
    );

    const name = useSelector((state) => state.search.name);

    const filterByName = products?.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
    );
    React.useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(
                `${config.SERVER_LINK}/products/get-products`
            );
            dispatch(productsAction.storeProducts(res.data));
        };
        getProducts();
    }, [dispatch]);

    return (
        <>
            <Grid container spacing={2}>
                {filterByName.slice(a, b).map((items) => {
                    return (
                        <Grid item lg={2} sm={4} xs={6}>
                            <ProductCard
                                id={items._id}
                                details={items.details}
                                name={items.name}
                                price={items.price}
                                quantity={items.quantity}
                                location={items.location}
                                catagory={items.catagory}
                                type={items.type}
                                url={items.url}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container spacing={2} style={{ justifyContent: "center" }}>
                <Grid item lg={12}>
                    {filterByName.length > 18 && (
                        <div
                            style={{
                                width: "100%",
                                textAlign: "center",
                                marginTop: "1rem",
                            }}>
                            <ButtonGroup aria-label="outlined button group">
                                <Button
                                    onClick={() => {
                                        if (deviceWidth()) {
                                            setA(0);
                                            setB(10);
                                        } else {
                                            setA(0);
                                            setB(18);
                                        }
                                    }}>
                                    1
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (deviceWidth()) {
                                            setA(10);
                                            setB(20);
                                        } else {
                                            setA(19);
                                            setB(36);
                                        }
                                    }}>
                                    2
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (deviceWidth()) {
                                            setA(20);
                                            setB(30);
                                        } else {
                                            setA(37);
                                            setB(54);
                                        }
                                    }}>
                                    3
                                </Button>
                                {deviceWidth() && (
                                    <>
                                        <Button
                                            onClick={() => {
                                                setA(30);
                                                setB(40);
                                            }}>
                                            4
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setA(40);
                                                setB(50);
                                            }}>
                                            5
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setA(50);
                                                setB(60);
                                            }}>
                                            6
                                        </Button>
                                    </>
                                )}
                            </ButtonGroup>
                        </div>
                    )}

                </Grid>
            </Grid>


        </>
    );
};

export default Products;
