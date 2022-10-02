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
import { navActions } from "../Redux/Features/navToggleSlice";

const NavBar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const dispatch = useDispatch();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const hideNav = () => {
        if (window.innerWidth < 900) {
            dispatch(navActions.navToggleHide());
        } else return;
    };

    const allHandler = (event) => {
        handleListItemClick(event, 0);
        dispatch(filterAction.filterCatagory(""));
        dispatch(filterAction.filterType(""));
        hideNav();
    };
    const fruitsHandler = (event) => {
        handleListItemClick(event, 1);
        dispatch(filterAction.filterCatagory("fruits"));
        hideNav();
    };
    const vegHandler = (event) => {
        handleListItemClick(event, 2);
        dispatch(filterAction.filterCatagory("vegetables"));
        hideNav();
    };
    const breakfastHandler = (event) => {
        handleListItemClick(event, 3);
        dispatch(filterAction.filterCatagory("breakfast"));
        hideNav();
    };
    const dairyHandler = (event) => {
        handleListItemClick(event, 4);
        dispatch(filterAction.filterCatagory("dairy"));
        hideNav();
    };
    const drinksHandler = (event) => {
        handleListItemClick(event, 5);
        dispatch(filterAction.filterCatagory("drinks"));
        hideNav();
    };
    const snacksHandler = (event) => {
        handleListItemClick(event, 6);
        dispatch(filterAction.filterCatagory("snacks"));
        hideNav();
    };
    const frozenHandler = (event) => {
        handleListItemClick(event, 7);
        dispatch(filterAction.filterCatagory("frozen"));
        hideNav();
    };
    const wineHandler = (event) => {
        handleListItemClick(event, 8);
        dispatch(filterAction.filterCatagory("wine"));
        hideNav();
    };
    const beerHandler = (event) => {
        handleListItemClick(event, 9);
        dispatch(filterAction.filterCatagory("beer"));
        hideNav();
    };
    const discountHandler = (event) => {
        handleListItemClick(event, 10);
        dispatch(filterAction.filterType("Discount"));
        hideNav();
    };

    return (
        <div style={{ margin: "0" }}>
            <Paper sx={{ borderRadius: "0", backgroundColor: "#F5F5F5" }}>
                <List sx={{ ml: "2rem" }}>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            onClick={allHandler}
                            selected={selectedIndex === 0}>
                            <ListItemText primary="🌎 All" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 1}
                            onClick={fruitsHandler}>
                            <ListItemText primary=" 🍇 Fruits" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            onClick={vegHandler}
                            selected={selectedIndex === 2}
                            component="a">
                            <ListItemText primary="🥬 Vegitables" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 3}
                            onClick={breakfastHandler}>
                            <ListItemText primary="🍞 Breakfast" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 4}
                            onClick={dairyHandler}>
                            <ListItemText primary="🥛 Dairy" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 5}
                            onClick={drinksHandler}>
                            <ListItemText primary="🍹 Drinks" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 6}
                            onClick={snacksHandler}>
                            <ListItemText primary="🍿 Snacks" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 7}
                            onClick={frozenHandler}>
                            <ListItemText primary="🧊 Frozen" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 8}
                            onClick={wineHandler}>
                            <ListItemText primary="🍾  Wine" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 9}
                            onClick={beerHandler}>
                            <ListItemText primary="🍺 Beer" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ pb: ".5rem" }}>
                        <ListItemButton
                            component="a"
                            selected={selectedIndex === 10}
                            onClick={discountHandler}>
                            <ListItemText primary="Discounted Items" />
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
