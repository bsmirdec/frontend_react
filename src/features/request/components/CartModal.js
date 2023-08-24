import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../../../components/forms/QuantitySelector";
import {
    Button,
    Modal,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const CartModal = ({ open, onClose }) => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
        useCart();

    const handleRemoveItem = (index) => {
        removeFromCart(index);
    };

    const handleCommand = () => {
        console.log("écran de confirmation");
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
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
                <Typography variant="h6">Mon panier</Typography>
                {cart.length !== 0 && (
                    <List>
                        {cart.map((item) => (
                            <ListItem key={item.product.product_id}>
                                <ListItem>
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
                                </ListItem>
                                <ListItemText primary={item.product.name} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                            handleRemoveItem(
                                                item.product.product_id,
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        <Button variant="contained" onClick={handleCommand}>
                            Passer Commande
                        </Button>
                    </List>
                )}
                {cart.length === 0 && <Typography>Panier vide</Typography>}
            </Box>
        </Modal>
    );
};

export default CartModal;
