import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDeliveryQuery from "../hooks/useDeliveryQuery";
import useDeliveryLinesQuery from "../hooks/useDeliveryLinesQuery";
import DisplayDelivery from "../components/DisplayDelivery";
import DeliveryValidationButton from "../components/DeliveryValidationButton";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const DeliveryContainer = () => {
    const { deliveryId } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);

    const {
        data: delivery,
        isDeliveryLoading,
        isDeliveryError,
    } = useDeliveryQuery(deliveryId);
    const {
        data: deliveryLines,
        isLoading,
        isError,
    } = useDeliveryLinesQuery(deliveryId);

    const [newDeliveryLines, setNewDeliveryLines] = useState([]);
    const isDeliveryLinesUpdated = deliveryLines !== newDeliveryLines;

    useEffect(() => {
        if (!isLoading) {
            setNewDeliveryLines(deliveryLines);
        }
    }, [isLoading, deliveryLines]);

    if (isDeliveryLoading || isLoading) {
        return <Loading />;
    }

    if (isDeliveryError || isError) {
        return <ErrorMessage message={isError.message} />;
    }

    const handleReceipt = () => {
        setIsEditMode(true);
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
            <Box m={2}>
                <Typography variant="h4">
                    Livraison n°{delivery.delivery_id} - Chantier :{" "}
                    {delivery.worksite.city} - {delivery.worksite.name}
                </Typography>
                <Typography variant="h4">
                    Commande n°{delivery.order.order_id}
                </Typography>
            </Box>
            <Box m={2}>
                <Typography>
                    Date prévisionnelle :{" "}
                    {delivery.expected_date_time
                        ? new Date(delivery.expected_date_time).toLocaleString()
                        : "N/A"}
                </Typography>
            </Box>

            <Box m={2}>
                <DisplayDelivery
                    delivery={delivery}
                    isEditMode={isEditMode}
                    newDeliveryLines={newDeliveryLines}
                    setNewDeliveryLines={setNewDeliveryLines}
                />
            </Box>
            <Box
                m={2}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {isEditMode === false ? (
                    <Button variant="contained" onClick={handleReceipt}>
                        Réceptionner la livraison
                    </Button>
                ) : (
                    <DeliveryValidationButton
                        isDeliveryLinesUpdated={isDeliveryLinesUpdated}
                        delivery={delivery}
                        deliveryLines={
                            isDeliveryLinesUpdated
                                ? newDeliveryLines
                                : deliveryLines
                        }
                    />
                )}
            </Box>
        </Box>
    );
};

export default DeliveryContainer;
