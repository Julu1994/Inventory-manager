import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editActions } from "../Redux/Features/toggleSlice";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "./SubComponents/headerSub";
import { SearchIconWrapper } from "./SubComponents/headerSub";
import { StyledInputBase } from "./SubComponents/headerSub";

const Header = () => {
    const dispatch = useDispatch();
    const editToggle = () => {
        dispatch(editActions.ToggleFalse());
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
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
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}>
                            Inventory Manager
                        </Typography>
                    </Link>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Header;
