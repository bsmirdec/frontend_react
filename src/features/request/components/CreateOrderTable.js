import React, { useEffect, useState } from "react";
import { useCart } from "../../products/context/CartContext";
import useStocksForWorksiteQuery from "../../stock/hooks/useStocksForWorksiteQuery";
import useMaxStockForWorksiteQuery from "../../stock/hooks/useMaxStockForWorksiteQuery";
import QuantitySelector from "../../../components/forms/QuantitySelector";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import DeleteIcon from "../../../components/forms/DeleteIcon";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const CreateOrderTable = ({ worksite }) => {
    const { stocks, isStocksError, isStocksLoading, stocksError } =
        useStocksForWorksiteQuery(worksite.worksite_id);
    const { maxStocks, isMaxStocksError, isMaxStocksLoading, maxStocksError } =
        useMaxStockForWorksiteQuery(worksite.worksite_id);
    const {
        cart,
        changeQuantity,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
    } = useCart();
    const [errorMessage, setErrorMessage] = useState("");

    if (isMaxStocksLoading || isStocksLoading) {
        <Loading />;
    }

    if (isStocksError) {
        <ErrorMessage message={stocksError.message} />;
    }

    if (isMaxStocksError) {
        <ErrorMessage message={maxStocksError.message} />;
    }

    const allowedProductQuantity = (productId, quantity) => {
        const productStock = stocks.filter(
            (stock) => stock.product.product_id === productId,
        );
        const productStockQuantity = productStock[0]?.quantity;
        const productMaxStock = maxStocks.filter(
            (stock) => stock.product.product_id === productId,
        );
        const productMaxStockQuantity = productMaxStock[0]?.quantity;
        const allowedProductQuantity =
            productMaxStockQuantity - productStockQuantity;
        return allowedProductQuantity;
    };

    const handleIncrementQuantity = (productId, quantity) => {
        if (quantity < allowedProductQuantity(productId, quantity)) {
            incrementQuantity(productId);
        } else {
            setErrorMessage({
                product: productId,
                message: "Quantité maximale atteinte !",
            });
        }
    };

    const handleDecrementQuantity = (productId) => {
        decrementQuantity(productId);
        setErrorMessage("");
    };

    const handleChange = (productId, quantity) => {
        if (quantity < allowedProductQuantity(productId, quantity)) {
            changeQuantity(productId, quantity);
        } else {
            setErrorMessage({
                product: productId,
                message: "Quantité maximale atteinte !",
            });
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produit</TableCell>
                            <TableCell>Quantité</TableCell>
                        </TableRow>
                    </TableHead>
                    {cart.length > 0 ? (
                        <TableBody>
                            {cart.map((item) => (
                                <TableRow key={item.product.product_id}>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell>
                                        <QuantitySelector
                                            quantity={item.quantity}
                                            onIncrement={() =>
                                                handleIncrementQuantity(
                                                    item.product.product_id,
                                                    item.quantity,
                                                )
                                            }
                                            onDecrement={() =>
                                                handleDecrementQuantity(
                                                    item.product.product_id,
                                                )
                                            }
                                            onChange={(newValue) =>
                                                handleChange(
                                                    item.product.product_id,
                                                    newValue,
                                                )
                                            }
                                        />
                                    </TableCell>
                                    {item.product.product_id ===
                                        errorMessage.product && (
                                        <TableCell>
                                            <ErrorMessage
                                                message={errorMessage.message}
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <DeleteIcon
                                            handleDelete={() =>
                                                removeFromCart(
                                                    item.product.product_id,
                                                )
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <ErrorMessage message={"Votre panier est vide"} />
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </div>
    );
};

export default CreateOrderTable;
