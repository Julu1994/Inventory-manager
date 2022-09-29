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

const NavBar = () => {
    return (
        <div style={{ margin: "0" }}>
            <Paper>
                <List sx={{ ml: "2rem" }}>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
                            <ListItemText primary="🌎 All" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
                            <ListItemText primary=" 🍇 Fruits" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => alert("hi")}
                            component="a">
                            <ListItemText primary="🥬 Vegitables" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
                            <ListItemText primary="🍞 Bread" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
                            <ListItemText primary="🥛 Dairy" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
                            <ListItemText primary="🍹 Drinks" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
                            <ListItemText primary="🍿 Snacks" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
                            <ListItemText primary="🧊 Frozen" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
                            <ListItemText primary="🍾  Wine" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a">
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
