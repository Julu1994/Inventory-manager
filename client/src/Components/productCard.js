import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CardActionArea, CardActions, IconButton } from "@mui/material";

const ProductCard = ({ name, quantity, price, location }) => {
    return (
        <Card sx={{ maxWidth: 145, mt: "1rem" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="80"
                    image="https://firebasestorage.googleapis.com/v0/b/mychat-46b79.appspot.com/o/Portfolio%2FecoomerceIMG.png?alt=media&token=475daa19-7de0-4346-bc89-dff5f8a0d1f5"
                    alt="green iguana"
                />
                <CardContent sx={{ margin: "0", padding: "0" }}>
                    <Typography
                        sx={{ pl: ".5rem" }}
                        gutterBottom
                        variant="body2"
                        color="text.secondary">
                        {name}
                    </Typography>
                    <Typography
                        sx={{ pl: ".5rem" }}
                        variant="body2"
                        color="text.secondary">
                        Quantity: {quantity}
                    </Typography>
                    <Typography
                        sx={{ pl: ".5rem" }}
                        variant="body2"
                        color="text.secondary">
                        Price: {price}.00 Kr.
                    </Typography>
                    <Typography
                        sx={{ pl: ".5rem" }}
                        variant="body2"
                        color="text.secondary">
                        Location: {location}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
                sx={{
                    margin: "0",
                    padding: "0",
                    justifyContent: "end",
                }}>
                <IconButton size="small" aria-label="delete">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" aria-label="Edit">
                    <EditIcon fontSize="inherit" />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
