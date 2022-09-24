import * as React from "react";
import "./homepage.scss";
import NavBar from "../Components/navBar";
import Products from "../Components/products";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

const Homepage = () => {
    const toggle = useSelector((state) => state.toggleEdit.toggle);
    console.log(toggle);
    return (
        <div className="home">
            <div className="home-nav">
                <NavBar />
            </div>
            <div className="home-product">
                <Grid container spacing={1}>
                    <Products />
                </Grid>
            </div>
        </div>
    );
};

export default Homepage;
