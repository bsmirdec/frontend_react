import React, { useEffect, useState } from "react";
import { useCart } from "../../products/context/CartContext";
import CreateOrderTable from "../components/CreateOrderTable";
import WorksiteSelector from "../components/WorksiteSelector";
import OrderButton from "../components/OrderButton";
import DateTimePickerComponent from "../../../components/forms/DateTimePickerComponent";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const OrderContainer = () => {
    const { cart } = useCart();
    const [selectedWorksite, setSelectedWorksite] = useState("");
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

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
            <Box m={2}>
                <Typography variant="h4">Nouvelle commande</Typography>
            </Box>
            <Box m={2}>
                <WorksiteSelector
                    selectedWorksite={selectedWorksite}
                    setSelectedWorksite={setSelectedWorksite}
                />
            </Box>
            <Box m={2} sx={{ display: "flex", flexDirection: "row" }}>
                <Typography variant="h6">
                    Sélectionnez la date souhaitée
                </Typography>
                <DateTimePickerComponent
                    selectedDateTime={selectedDateTime}
                    setSelectedDateTime={setSelectedDateTime}
                />
            </Box>
            <Box m={2}>
                <CreateOrderTable />
            </Box>
            <Box m={2}>
                <OrderButton
                    worksite={selectedWorksite}
                    dateTime={selectedDateTime}
                />
            </Box>
        </Box>
    );
};

export default OrderContainer;
