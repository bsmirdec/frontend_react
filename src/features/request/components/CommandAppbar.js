import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    InputBase,
    Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CommandAppbar = ({ setCategoryDrawerOpen, setCartDrawerOpen }) => {
    const handleCategoryDrawerOpen = () => {
        setCategoryDrawerOpen(true);
    };

    const handleCartDrawerOpen = () => {
        setCartDrawerOpen(true);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="static" sx={{ width: "100%" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleCategoryDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        placeholder="Rechercher..."
                        startAdornment={<SearchIcon />}
                        sx={{ ml: 2, flex: 1 }}
                    />
                    <IconButton
                        color="inherit"
                        aria-label="panier"
                        onClick={handleCartDrawerOpen}
                    >
                        <Badge badgeContent={4} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default CommandAppbar;
