import React from "react";
import ProductCard from "./productCard";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../Redux/api/productsApiSlice";

const Products = () => {
    const catagory = useSelector((state) => state.filter.catagory);
    const type = useSelector((state) => state.filter.type);
    const deviceWidth = () => {
        return window.innerWidth < 900;
    };
    const [a, setA] = React.useState(0);
    const [b, setB] = React.useState(deviceWidth() ? 10 : 18);
    const { data: allProducts, isError, isLoading } = useGetProductsQuery();
    const name = useSelector((state) => state.search.name);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching products</div>;
    }

    const productsDiscount = allProducts?.filter((item) =>
        item.type.toLowerCase().includes(type.toLowerCase())
    );

    const products = productsDiscount?.filter((item) =>
        item.catagory.toLowerCase().includes(catagory.toLowerCase())
    );

    const filterByName = products?.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
    );
    return (
        <>
            <Grid container spacing={2}>
                {filterByName.slice(a, b).map((items) => {
                    return (
                        <Grid item lg={2} sm={4} xs={6} key={items._id}>
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
