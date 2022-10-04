import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editActions } from "../Redux/Features/toggleSlice";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "./SubComponents/headerSub";
import { SearchIconWrapper } from "./SubComponents/headerSub";
import { StyledInputBase } from "./SubComponents/headerSub";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import axios from "axios";
import { Notify } from "notiflix";
import { userActions } from "../Redux/Features/userSlice";
import { searchAction } from "../Redux/Features/searchSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";
import { navActions } from "../Redux/Features/navToggleSlice";

const Header = () => {
    const loggedInUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editToggle = () => {
        dispatch(editActions.ToggleFalse());
    };
    const navToggle = () => {
        dispatch(navActions.navToggle());
    };
    const logout = async () => {
        try {
            await axios.get(
                "https://inventory-manager-server-jewel.herokuapp.com/auth/logout"
            );
            dispatch(userActions.notUser());
            navigate("/login");
            Notify.success("User logout");
        } catch {
            Notify.failure("Logout faild!");
        }
    };
    const actionHandler = async (e) => {
        dispatch(searchAction.searchName(e.target.value));
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={navToggle}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                    </Box>
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
                            sx={{
                                flexGrow: 1,
                                fontSize: "1.5rem",
                                display: { xs: "none", md: "flex" },
                            }}>
                            I
                            <StoreOutlinedIcon sx={{ fontSize: "2rem" }} />M
                        </Typography>
                    </Link>
                    {loggedInUser && (
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>

                            <StyledInputBase
                                onChange={actionHandler}
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    )}
                    {!loggedInUser ? (
                        <Link
                            to="/login"
                            style={{
                                textDecoration: "none",
                                color: "white",
                            }}>
                            <Button size="small" color="inherit">
                                Login
                            </Button>
                        </Link>
                    ) : (
                        <Button size="small" color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Header;
