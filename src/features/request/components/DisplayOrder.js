import React from "react";
import { useCart } from "../../products/context/CartContext";
import DeleteIcon from "../../../components/forms/DeleteIcon";
import QuantitySelector from "../../../components/forms/QuantitySelector";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
} from "@mui/material";

const DisplayOrder = ({
    order,
    isEditMode,
    newOrderLines,
    setNewOrderLines,
    isAddCartVisible,
    setIsAddCartVisible,
}) => {
    const { cart, setCart } = useCart();

    const incrementQuantity = (product_id) => {
        const updatedOrderLines = newOrderLines.map((item) => {
            if (item.product.product_id === product_id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setNewOrderLines(updatedOrderLines);
    };

    const decrementQuantity = (product_id) => {
        const updatedOrderLines = newOrderLines.map((item) => {
            if (item.product.product_id === product_id) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setNewOrderLines(updatedOrderLines);
    };

    const removeItem = (productId) => {
        const updatedOrderLines = newOrderLines.filter(
            (item) => item.product.product_id !== productId,
        );
        setNewOrderLines(updatedOrderLines);
    };

    const handleAddCartLines = () => {
        setNewOrderLines((prevOrderLines) => {
            const mergedLines = [];

            // Merge orderLines and cart, considering quantity updates
            prevOrderLines.forEach((orderLine) => {
                const cartItem = cart.find(
                    (item) =>
                        item.product.product_id ===
                        orderLine.product.product_id,
                );
                if (cartItem) {
                    const newQuantity = orderLine.quantity + cartItem.quantity;
                    mergedLines.push({ ...orderLine, quantity: newQuantity });
                } else {
                    mergedLines.push(orderLine);
                }
            });

            // Add cart items that are not already in orderLines
            cart.forEach((cartItem) => {
                const exists = prevOrderLines.some(
                    (orderLine) =>
                        orderLine.product.product_id ===
                        cartItem.product.product_id,
                );
                if (!exists) {
                    mergedLines.push({
                        product: cartItem.product,
                        quantity: cartItem.quantity,
                        order: order.order_id,
                    });
                }
            });
            return mergedLines;
        });
        setCart([]);
        setIsAddCartVisible(false);
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
                    <TableBody>
                        {newOrderLines.map((item) => (
                            <TableRow key={item.order_line_id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>
                                    {isEditMode ? (
                                        <Box sx={{ display: "flex" }}>
                                            <QuantitySelector
                                                quantity={item.quantity}
                                                onIncrement={() =>
                                                    incrementQuantity(
                                                        item.product.product_id,
                                                    )
                                                }
                                                onDecrement={() =>
                                                    decrementQuantity(
                                                        item.product.product_id,
                                                    )
                                                }
                                            />
                                            <DeleteIcon
                                                handleDelete={() =>
                                                    removeItem(
                                                        item.product.product_id,
                                                    )
                                                }
                                            />
                                        </Box>
                                    ) : (
                                        <Typography>{item.quantity}</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {isEditMode && isAddCartVisible && (
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={handleAddCartLines}
                                    >
                                        Ajouter mon panier
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DisplayOrder;
