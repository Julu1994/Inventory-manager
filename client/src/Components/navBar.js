import React from "react";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
} from "@mui/material";

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
                </List>
            </Paper>
        </div>
    );
};

export default NavBar;
