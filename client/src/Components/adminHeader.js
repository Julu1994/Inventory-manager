import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editActions } from "../Redux/Features/toggleSlice";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "./SubComponents/muiStyles";
import { SearchIconWrapper } from "./SubComponents/muiStyles";
import { StyledInputBase } from "./SubComponents/muiStyles";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import axios from "axios";
import { Notify } from "notiflix";
import { userActions } from "../Redux/Features/userSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";
import { navActions } from "../Redux/Features/navToggleSlice";
import { config } from "../config";

const AdminHeader = () => {
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
      await axios.get(`${config.SERVER_LINK}/auth/logout`);
      dispatch(userActions.notUser());
      navigate("/login");
      Notify.success("User logout");
    } catch {
      Notify.failure("Logout faild!");
    }
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#000080" }}>
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
            <>
              <Link to={"/"} style={{ color: "#FFFFFF	" }}>
                <Button size="small" color="inherit">
                  Back
                </Button>
              </Link>
              <Button size="small" color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default AdminHeader;
