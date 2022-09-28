import * as React from "react";
import "./homepage.scss";
import NavBar from "../Components/navBar";
import Products from "../Components/products";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Redux/Features/userSlice";
import StoreMallDirectoryTwoToneIcon from "@mui/icons-material/StoreMallDirectoryTwoTone";
const Homepage = () => {
    const isLoggedIn = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    React.useEffect(() => {
        const getUser = async () => {
            const user = await axios.get("http://localhost:4000/auth/loggedIn");
            if (user.data.id) {
                dispatch(userActions.isUser());
            }
        };
        getUser();
    }, [dispatch]);
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
