import * as React from "react";
import "./homepage.scss";
import NavBar from "../Components/navBar";
import Products from "../Components/products";
import { Grid, Typography } from "@mui/material";
import StoreMallDirectoryTwoToneIcon from "@mui/icons-material/StoreMallDirectoryTwoTone";
import { useSelector } from "react-redux";
import { UserId } from "../Components/getUser";
const Homepage = () => {
    const isLoggedIn = useSelector((state) => state.user.user);
    UserId();

    return (
        <div className="home">
            {isLoggedIn ? (
                <>
                    <div className="home-nav">
                        <NavBar />
                    </div>
                    <div className="home-product">
                        <Grid container spacing={1}>
                            <Products />
                        </Grid>
                    </div>
                </>
            ) : (
                <div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <div>
                            <StoreMallDirectoryTwoToneIcon
                                sx={{
                                    fontSize: "25vw",
                                    mt: "3rem",
                                    color: "#000080",
                                }}
                            />
                        </div>
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: "center",
                                mt: "3rem",
                                color: "#000080",
                            }}>
                            Welcome to Inventory Manager
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;
