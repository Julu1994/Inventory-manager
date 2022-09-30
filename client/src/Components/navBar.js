import React from "react";
import {
    Fab,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterAction } from "../Redux/Features/filterSlice";

const NavBar = () => {
    const dispatch = useDispatch();

    const allHandler = () => {
        dispatch(filterAction.filterCatagory(""));
    };
    const fruitsHandler = () => {
        dispatch(filterAction.filterCatagory("fruits"));
    };
    const vegHandler = () => {
        dispatch(filterAction.filterCatagory("vegetables"));
    };
    const breakfastHandler = () => {
        dispatch(filterAction.filterCatagory("breakfast"));
    };
    const dairyHandler = () => {
        dispatch(filterAction.filterCatagory("dairy"));
    };
    const drinksHandler = () => {
        dispatch(filterAction.filterCatagory("drinks"));
    };
    const snacksHandler = () => {
        dispatch(filterAction.filterCatagory("snacks"));
    };
    const frozenHandler = () => {
        dispatch(filterAction.filterCatagory("frozen"));
    };
    const wineHandler = () => {
        dispatch(filterAction.filterCatagory("wine"));
    };
    const beerHandler = () => {
        dispatch(filterAction.filterCatagory("beer"));
    };
    return (
        <div style={{ margin: "0" }}>
            <Paper>
                <List sx={{ ml: "2rem" }}>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={allHandler}>
                            <ListItemText primary="🌎 All" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={fruitsHandler}>
                            <ListItemText primary=" 🍇 Fruits" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={vegHandler} component="a">
                            <ListItemText primary="🥬 Vegitables" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            component="a"
                            onClick={breakfastHandler}>
                            <ListItemText primary="🍞 Breakfast" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={dairyHandler}>
                            <ListItemText primary="🥛 Dairy" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={drinksHandler}>
                            <ListItemText primary="🍹 Drinks" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={snacksHandler}>
                            <ListItemText primary="🍿 Snacks" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={frozenHandler}>
                            <ListItemText primary="🧊 Frozen" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={wineHandler}>
                            <ListItemText primary="🍾  Wine" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" onClick={beerHandler}>
                            <ListItemText primary="🍺 Beer" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <Tooltip title="Add new product">
                            <Link to="/add-product">
                                <Fab
                                    sx={{ ml: ".8rem" }}
                                    size="small"
                                    color="primary"
                                    aria-label="add">
                                    <AddIcon />
                                </Fab>
                            </Link>
                        </Tooltip>
                    </ListItem>
                </List>
            </Paper>
        </div>
    );
};

export default NavBar;
