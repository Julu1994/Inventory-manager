import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const CardAction = ({ editItem, deleteItem }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                size="small"
                font="inherit"
                sx={{ pl: "1rem" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}>
                <MoreVertIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}>
                <Link
                    to="inbound"
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            editItem();
                        }}>
                        Inbound
                    </MenuItem>
                </Link>
                <Link
                    to="/shrink"
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem
                        onClick={() => {
                            editItem();
                            handleClose();
                        }}>
                        Shrink
                    </MenuItem>
                </Link>
                <Link
                    to="/add-product"
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            editItem();
                        }}>
                        Edit Item
                    </MenuItem>
                </Link>
                <Link
                    to="/discount"
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem
                        onClick={() => {
                            editItem();
                            handleClose();
                        }}>
                        Make Discount
                    </MenuItem>
                </Link>

                <MenuItem
                    onClick={() => {
                        handleClose();
                        deleteItem();
                    }}>
                    Delete Item
                </MenuItem>
            </Menu>
        </div>
    );
};

export default CardAction;
