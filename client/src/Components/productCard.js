import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CardActionArea, CardActions, IconButton } from "@mui/material";

const ProductCard = () => {
    return (
        <Card sx={{ maxWidth: 145 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="80"
                    image="https://firebasestorage.googleapis.com/v0/b/mychat-46b79.appspot.com/o/Portfolio%2FecoomerceIMG.png?alt=media&token=475daa19-7de0-4346-bc89-dff5f8a0d1f5"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="body2"
                        color="text.secondary">
                        Apple
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Quantity: 6 Location: L8
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="Edit">
                    <EditIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
