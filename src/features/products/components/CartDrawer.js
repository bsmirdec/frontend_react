import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "@emotion/react";
import QuantitySelector from "../../../components/forms/QuantitySelector";
import DeleteIcon from "../../../components/forms/DeleteIcon";
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
import { Sector } from "recharts";

const CartDrawer = () => {
    const theme = useTheme();
    const {
        cart,
        setCart,
        cartDrawerOpen,
        toggleCartDrawer,
        changeQuantity,
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

    const handleOrder = () => {
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
                                    onChange={(newValue) =>
                                        changeQuantity(
                                            item.product.product_id,
                                            newValue,
                                        )
                                    }
                                />
                            </ListItem>
                            <ListItemText primary={item.product.name} />
                            <DeleteIcon
                                handleDelete={() =>
                                    handleRemoveItem(item.product.product_id)
                                }
                            />
                        </ListItem>
                    ))}
                    <Button
                        variant="contained"
                        component={Link}
                        to="/request/order/"
                        style={{ margin: "5px" }}
                    >
                        Passer Commande
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            margin: "5px",
                            backgroundColor: theme.palette.secondary.main,
                        }}
                        onClick={() => setCart([])}
                    >
                        Vider le panier
                    </Button>
                </List>
            )}
            {cart.length === 0 && <Typography>Panier vide</Typography>}
        </Drawer>
    );
};

export default CartDrawer;
