import * as React from "react";
import "./homepage.scss";
import NavBar from "../Components/navBar";
import Products from "../Components/products";
import { Grid, Typography } from "@mui/material";
import StoreMallDirectoryTwoToneIcon from "@mui/icons-material/StoreMallDirectoryTwoTone";
import { useDispatch, useSelector } from "react-redux";
// import { UserId } from "../Components/getUser";
import { navActions } from "../Redux/Features/navToggleSlice";
const Homepage = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.user);
    const navToggle = useSelector((state) => state.nav.toggle);
    console.log(isLoggedIn);

    React.useEffect(() => {
        const hideNav = () => {
            if (window.innerWidth < 900) {
                dispatch(navActions.navToggleHide());
            }
        };
        console.log("hi");
        hideNav();
    }, [dispatch]);

    return (
        <div className="home">
            {isLoggedIn ? (
                <>
                    <div className={navToggle ? "home-nav" : "nav-toggle"}>
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
