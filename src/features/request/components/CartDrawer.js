import React from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "@emotion/react";
import QuantitySelector from "../../../components/forms/QuantitySelector";
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Toolbar,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const CartDrawer = () => {
    const theme = useTheme();
    const {
        cart,
        cartDrawerOpen,
        toggleCartDrawer,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
    } = useCart();

    const handleCartDrawerClose = () => {
        toggleCartDrawer();
    };

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
    };

    const handleCommand = () => {
        console.log("écran de confirmation");
    };

    const drawerWidth = 240;

    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={cartDrawerOpen}
            onClose={handleCartDrawerClose}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <List>
                <ListItem>
                    <Typography variant="h6">Mon panier</Typography>
                </ListItem>
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
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() =>
                                        handleRemoveItem(
                                            item.product.product_id,
                                        )
                                    }
                                >
                                    <DeleteIcon
                                        style={{
                                            color: theme.palette.secondary.main,
                                        }}
                                    />
                                </IconButton>
                            </ListItem>
                        ))}
                        <Button variant="contained" onClick={handleCommand}>
                            Passer Commande
                        </Button>
                    </List>
                )}
                {cart.length === 0 && <Typography>Panier vide</Typography>}
            </List>
        </Drawer>
    );
};

export default CartDrawer;
