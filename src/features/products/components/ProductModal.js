import React from "react";
import {
    Modal,
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Divider,
} from "@mui/material";

const subtitles = {
    name: "Nom",
    category: "Catégorie",
    type: "Type",
    brand: "Marque",
    model: "Modèle",
    packaging: "Conditionnement",
    weight: "Poids(kg)",
    height: "Hauteur(cm)",
    length: "Longueur(cm)",
    width: "Largeur/épaisseur(cm)",
};

const displayValue = (key, value, product) => {
    if (key === "category") {
        return product.category.name;
    }
    if (key === "type") {
        return product.type.name;
    }
    return value;
};

const renderProperty = (key, value, product) => {
    if (key === "product_id" || key === "name") {
        return null;
    }

    const subtitle = subtitles[key];

    return (
        <Grid key={key} item xs={6}>
            <Typography
                variant="subtitle1"
                style={{ textDecoration: "underline" }}
            >
                {subtitle}:
            </Typography>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {displayValue(key, value, product) &&
                    displayValue(key, value, product).toString()}
            </Typography>
        </Grid>
    );
};

const ProductModal = ({ product, open, onClose }) => {
    if (!product) {
        return null;
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Card
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <CardContent>
                    <Typography variant="h4">{product.name}</Typography>
                    <Divider />
                    <Grid container spacing={2}>
                        {Object.keys(product).map((key) =>
                            renderProperty(key, product[key], product),
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Modal>
    );
};

export default ProductModal;
