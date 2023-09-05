import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../../features/products/context/CartContext";
import { Box, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "../../../features/products/components/CartModal";

const CartIcon = () => {
    const location = useLocation();
    const { cart, toggleCartDrawer } = useCart();

    const [cartModalOpen, setCartModalOpen] = useState(false);

    const handleCartOpen = () => {
        location.pathname === "/product/" && toggleCartDrawer();
        location.pathname !== "/product/" && setCartModalOpen(!cartModalOpen);
    };

    const handleCartModalClose = () => {
        setCartModalOpen(!cartModalOpen);
    };

    return (
        <Box>
            <IconButton
                color="inherit"
                aria-label="panier"
                onClick={handleCartOpen}
            >
                <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <CartModal open={cartModalOpen} onClose={handleCartModalClose} />
        </Box>
    );
};

export default CartIcon;
