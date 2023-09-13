import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProductsListQuery from "../../products/hooks/useProductsListQuery";
import useCreateMaxStockMutation from "../hooks/useCreateMaxStockMutation";
import { CRITICAL_PRODUCTS } from "../utils/CRITICAL_PRODUCTS";
import QuantitySelector from "../../../components/forms/QuantitySelector";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import Loading from "../../../components/layout/Loading";
import { Box, Button, Grid, Container, Typography } from "@mui/material";

const MaxStockForm = ({ worksite }) => {
    const { products, isProductsLoading, isProductsError, error } =
        useProductsListQuery();
    const createMaxStock = useCreateMaxStockMutation();
    const [maxStocks, setMaxStocks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isProductsLoading) {
            const filteredProducts = products.filter((product) =>
                CRITICAL_PRODUCTS.includes(product.product_id),
            );

            // Créer une nouvelle liste maxStocks en utilisant filteredProducts
            const newMaxStocks = filteredProducts.map((product) => ({
                worksiteId: worksite.worksiteId,
                product: product,
                quantity: 0,
            }));
            setMaxStocks(newMaxStocks);
        }
    }, [products, worksite]);

    useEffect(() => {
        console.log(maxStocks);
    }, [maxStocks]);

    if (isProductsLoading) {
        return <Loading />;
    }

    if (isProductsError) {
        return <ErrorMessage message={error.message} />;
    }

    const incrementQuantity = (product_id) => {
        const updatedStock = maxStocks.map((item) => {
            if (item.product.product_id === product_id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setMaxStocks(updatedStock);
    };

    const decrementQuantity = (product_id) => {
        const updatedStock = maxStocks.map((item) => {
            if (item.product.product_id === product_id) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setMaxStocks(updatedStock);
    };

    const onSubmit = async () => {
        try {
            const response = await createMaxStock.mutateAsync(maxStocks);
            if (response) {
                console.log(response);
                navigate("/worksite/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Typography m={2} variant="h5" style={{ textAlign: "center" }}>
                Affectation des quantités maximales
            </Typography>
            <Grid container spacing={2}>
                {maxStocks.map((item) => (
                    <Grid
                        item
                        xs={12}
                        key={item.product.product_id}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Typography style={{ minWidth: "300px" }}>
                            {item.product.name}
                        </Typography>
                        <QuantitySelector
                            quantity={item.quantity}
                            onIncrement={() =>
                                incrementQuantity(item.product.product_id)
                            }
                            onDecrement={() =>
                                decrementQuantity(item.product.product_id)
                            }
                        />
                    </Grid>
                ))}
            </Grid>
            <Box m={2}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    Valider
                </Button>
            </Box>
        </Container>
    );
};

export default MaxStockForm;
