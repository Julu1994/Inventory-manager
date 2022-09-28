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

const Header = () => {
    const loggedInUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editToggle = () => {
        dispatch(editActions.ToggleFalse());
    };

    const logout = async () => {
        try {
            await axios.get("http://localhost:4000/auth/logout");
            dispatch(userActions.notUser());
            navigate("/login");
            Notify.success("User logout");
        } catch {
            Notify.failure("Logout faild!");
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
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
                            <StoreOutlinedIcon sx={{ fontSize: "2.5rem" }} />
                        </Typography>
                    </Link>
                    {loggedInUser && (
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
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
                            <Button color="inherit">Login</Button>
                        </Link>
                    ) : (
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Header;
