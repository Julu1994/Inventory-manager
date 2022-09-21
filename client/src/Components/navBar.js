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
        <div>
            {" "}
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
