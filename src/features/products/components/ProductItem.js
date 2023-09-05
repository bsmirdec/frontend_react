import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from "@mui/material";

const ProductItem = ({ product, handleOpen, handleAdd }) => {
    return (
        <Card
            key={product.product_id}
            sx={{ minHeight: "200px", minWidth: "200px", borderRadius: "5px" }}
        >
            <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Button onClick={() => handleOpen(product)} color="primary">
                    Détails
                </Button>
                <Button color="secondary" onClick={() => handleAdd(product)}>
                    Ajouter
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductItem;
