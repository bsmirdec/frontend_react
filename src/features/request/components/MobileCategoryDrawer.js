import React, { useState } from "react";
import CategoryDrawer from "./CategoryDrawer";
import {
    AppBar,
    Box,
    Drawer,
    Button,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const MobileCategoryDrawer = ({
    open,
    onClose,
    selectedType,
    setSelectedType,
}) => {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

    if (!isMobileScreen) {
        return null; // Ne pas afficher ce composant sur les écrans d'ordinateur
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Toolbar />
            <AppBar position="static">
                <Toolbar>
                    <Button fullWidth color="primary" variant="text">
                        Catégories & types
                    </Button>
                </Toolbar>
            </AppBar>
            <CategoryDrawer
                open={open}
                onClose={onClose}
                variant={"temporary"}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
        </Box>
    );
};

export default MobileCategoryDrawer;
