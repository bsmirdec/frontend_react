import React from "react";
import { useCart } from "../../products/context/CartContext";
import QuantitySelector from "../../../components/forms/QuantitySelector";
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

const CreateOrderTable = () => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
        useCart();

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
                        {cart.map((item) => (
                            <TableRow key={item.product.product_id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>
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
                                </TableCell>
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
                </Table>
            </TableContainer>
        </div>
    );
};

export default CreateOrderTable;
