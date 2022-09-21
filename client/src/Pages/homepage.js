import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NavBar from "../Components/navBar";

const Homepage = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <NavBar />
                </Grid>
                <Grid item xs={12} lg={9}></Grid>
            </Grid>
        </Box>
    );
};

export default Homepage;
