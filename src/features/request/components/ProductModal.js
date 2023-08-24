import React from "react";
import { Modal, Box, Typography, Card, CardContent } from "@mui/material";

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
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    {/* Ajoutez d'autres détails du produit ici */}
                </CardContent>
            </Card>
        </Modal>
    );
};

export default ProductModal;
