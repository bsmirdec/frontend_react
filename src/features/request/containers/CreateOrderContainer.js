import React, { useState } from "react";
import CreateOrderTable from "../components/CreateOrderTable";
import WorksiteSelector from "../components/WorksiteSelector";
import OrderButton from "../components/OrderButton";
import DateTimePickerComponent from "../../../components/forms/DateTimePickerComponent";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { Box, Typography } from "@mui/material";

const OrderContainer = () => {
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
            {selectedWorksite ? (
                <Box m={2}>
                    <CreateOrderTable worksite={selectedWorksite} />
                </Box>
            ) : (
                <ErrorMessage message={"Veuillez sélectionner un chantier"} />
            )}

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
