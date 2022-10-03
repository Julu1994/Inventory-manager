import React from "react";
import ProductCard from "./productCard";
import axios from "axios";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../Redux/Features/productsSlice";

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

    const productsDiscount = Array.isArray(allProducts)
        ? allProducts.filter((item) =>
              item.type.toLowerCase().includes(type.toLowerCase())
          )
        : [];

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
                "https://inventory-manager-jewel.netlify.app/"
            );
            dispatch(productsAction.storeProducts(res.data));
        };
        getProducts();
    }, [dispatch]);

    return (
        <>
            {filterByName.slice(a, b).map((item) => {
                return (
                    <Grid item xs={6} sm={3} md={3} lg={2} key={item._id}>
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
        </>
    );
};

export default Products;
