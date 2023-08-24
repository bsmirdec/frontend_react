import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import {
    AppBar,
    Grid,
    Box,
    useMediaQuery,
    useTheme,
    Toolbar,
} from "@mui/material";
import CategoryDrawer from "../components/CategoryDrawer";
import MobileCategoryDrawer from "../components/MobileCategoryDrawer";
import CartDrawer from "../components/CartDrawer";
import Catalogue from "../components/Catalogue";

const CommandContainer = () => {
    const { cartDrawerOpen } = useCart();
    const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleCategoryDrawerClose = () => {
        setCategoryDrawerOpen(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    marginTop: isMobileScreen ? 64 : 0, // Décalage en fonction de l'écran mobile ou non
                }}
            >
                {isMobileScreen ? (
                    <MobileCategoryDrawer
                        open={categoryDrawerOpen}
                        onClose={handleCategoryDrawerClose}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                ) : (
                    <CategoryDrawer
                        variant={"permanent"}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                )}
                <CartDrawer open={cartDrawerOpen} />
                <Grid container spacing={2} sx={{ flexGrow: 1, p: 3 }}>
                    <Catalogue selectedType={selectedType} />
                </Grid>
            </Box>
        </Box>
    );
};

export default CommandContainer;
