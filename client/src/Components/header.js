import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editActions } from "../Redux/Features/toggleSlice";

const Header = () => {
    const dispatch = useDispatch();
    const editToggle = () => {
        dispatch(editActions.ToggleFalse());
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: "flex", md: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Link
                        onClick={editToggle}
                        to="/"
                        style={{
                            flexGrow: 1,
                            textDecoration: "none",
                            color: "white",
                        }}>
                        <Typography variant="h6" component="div">
                            Inventory Manager
                        </Typography>
                    </Link>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Header;
