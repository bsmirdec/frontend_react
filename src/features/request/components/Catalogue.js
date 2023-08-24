import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import useProductsListQuery from "../hooks/useProductsListQuery";
import ProductModal from "./ProductModal";
import ProductItem from "./ProductItem";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import Loading from "../../../components/layout/Loading";
import { Grid, Box } from "@mui/material";

const Catalogue = ({ selectedType }) => {
    const { addToCart } = useCart();
    const { data: products, isLoading, isError } = useProductsListQuery();
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpen = (product) => {
        setSelectedProduct(product);
        if (product) {
            setProductModalOpen(true);
        }
    };

    const handleClose = () => {
        setProductModalOpen(false);
        setSelectedProduct(null);
    };

    const handleAdd = (product) => {
        setSelectedProduct(product);
        addToCart(product);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Grid container spacing={2}>
                {products
                    .filter(
                        (product) =>
                            selectedType === null ||
                            product.type === selectedType,
                    )
                    .map((product) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={product.product_id}
                        >
                            <ProductItem
                                key={product.product_id}
                                product={product}
                                handleOpen={handleOpen}
                                handleAdd={handleAdd}
                            />
                        </Grid>
                    ))}
            </Grid>
            <ProductModal
                product={selectedProduct}
                open={productModalOpen}
                onClose={handleClose}
            />
        </Box>
    );
};

export default Catalogue;
