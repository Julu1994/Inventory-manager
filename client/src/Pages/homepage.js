import * as React from "react";
import "./homepage.scss";
import NavBar from "../Components/navBar";
import Products from "../Components/products";
import { Grid } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Redux/Features/userSlice";

const Homepage = () => {
    const isLoggedIn = useSelector((state) => state.user.user);
    console.log(isLoggedIn);
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
