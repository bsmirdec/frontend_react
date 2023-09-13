import React from "react";
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
} from "@mui/material";

const DisplayDelivery = ({
    delivery,
    isEditMode,
    newDeliveryLines,
    setNewDeliveryLines,
}) => {
    const decrementQuantity = (product_id) => {
        const updatedDeliveryLines = newDeliveryLines.map((item) => {
            if (item.product.product_id === product_id) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setNewDeliveryLines(updatedDeliveryLines);
        console.log(updatedDeliveryLines);
    };

    const removeItem = (productId) => {
        const updatedDeliveryLines = newDeliveryLines.filter(
            (item) => item.product.product_id !== productId,
        );
        setNewDeliveryLines(updatedDeliveryLines);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{
                                    textAlign: "center",
                                    borderRight: "1px solid #ccc",
                                    fontSize: "1.5em",
                                }}
                            >
                                Produit
                            </TableCell>
                            <TableCell
                                style={{
                                    textAlign: "center",
                                    fontSize: "1.5em",
                                }}
                            >
                                Quantité
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newDeliveryLines.map((item) => (
                            <TableRow key={item.delivery_line_id}>
                                <TableCell
                                    style={{
                                        textAlign: "center",
                                        borderRight: "1px solid #ccc",
                                    }}
                                >
                                    {item.product.name}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {isEditMode ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                            }}
                                        >
                                            <QuantitySelector
                                                quantity={item.quantity}
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
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DisplayDelivery;
