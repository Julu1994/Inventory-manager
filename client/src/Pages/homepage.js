import * as React from "react";
import NavBar from "../Components/navBar";
import Products from "../Components/products";
import { Drawer, Grid, Hidden, Typography } from "@mui/material";
import StoreMallDirectoryTwoToneIcon from "@mui/icons-material/StoreMallDirectoryTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { navActions } from "../Redux/Features/navToggleSlice";
import Header from "../Components/header";
import { Box } from "@mui/system";
const Homepage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.user);
  const navToggle = useSelector((state) => state.nav.toggle);

  React.useEffect(() => {
    const hideNav = () => {
      if (window.innerWidth < 900) {
        dispatch(navActions.navToggleHide());
      }
    };
    hideNav();
  }, [dispatch]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Box sx={{ display: "block" }}>
            <Header />
          </Box>

          <Box>
            <Hidden only={['lg']}>
              <Drawer
                variant="temporary"
                open={navToggle}
                onClose={() => dispatch(navActions.navToggleHide())}
              >
                <NavBar />
              </Drawer>
            </Hidden>

            <Grid container spacing={2}>
              <Hidden only={['xs', 'sm',]}>
                <Grid item md={2.5}>
                  <NavBar />
                </Grid>
              </Hidden>
              <Grid item xs={12} md={9.5}>
                <Products />
              </Grid>
            </Grid>
          </Box>
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
    </>
  );
};

export default Homepage;
