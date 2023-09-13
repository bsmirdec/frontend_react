import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useOrderQuery from "../hooks/useOrderQuery";
import useOrderLinesQuery from "../hooks/useOrderLinesQuery";
import OrderValidationButton from "../components/OrderValidationButton";
import OrderRejectButton from "../components/OrderRejectButton";
import DisplayOrder from "../components/DisplayOrder";
import DateTimePickerComponent from "../../../components/forms/DateTimePickerComponent";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import BackButton from "../../../components/layout/BackButton";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const OrderContainer = () => {
    const theme = useTheme();
    const { businessData } = useBusiness();
    const { orderId } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);

    const { order, isOrderLoading, isOrderError } = useOrderQuery(orderId);
    const { orderLines, isOrderLinesLoading, isOrderLinesError } =
        useOrderLinesQuery(orderId);
    const [newOrder, setNewOrder] = useState(null);
    const [newOrderLines, setNewOrderLines] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [isAddCartVisible, setIsAddCartVisible] = useState(true);
    const isOrderLinesUpdated = orderLines !== newOrderLines;

    useEffect(() => {
        if (!isOrderLoading) {
            setNewOrder(order);
        }
        if (order) {
            setSelectedDateTime(order.date_time);
            console.log(order);
        }
        if (!isOrderLinesLoading) {
            setNewOrderLines(orderLines);
        }
        console.log(orderId);
    }, [orderId, order, isOrderLoading, isOrderLinesLoading, orderLines]);

    useEffect(() => {
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            date_time: selectedDateTime,
        }));
    }, [selectedDateTime]);

    if (isOrderLoading || isOrderLinesLoading) {
        return <Loading />;
    }

    if (isOrderError || isOrderLinesError) {
        return (
            <ErrorMessage
                message={isOrderError.message || isOrderLinesError.message}
            />
        );
    }

    const canEmployeeValidate = () => {
        const employeeThreshold = businessData.threshold;
        if (employeeThreshold > order.validation) {
            return true;
        } else {
            return false;
        }
    };

    const handleUpdate = () => {
        setIsEditMode(true);
        setIsAddCartVisible(true);
    };

    const handleAbort = () => {
        setNewOrderLines(orderLines);
        setIsEditMode(false);
    };

    if (order.status === "confirmé") {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Box m={2}>
                    <Typography variant="h4">
                        La Commande n°{order.order_id} - Chantier :{" "}
                        {order.worksite.city} - {order.worksite.name} est
                        archivée.
                    </Typography>
                </Box>
                <Box
                    m={2}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <BackButton />
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Box m={2}>
                <Typography variant="h4">
                    Commande n°{order.order_id} - Chantier :{" "}
                    {order.worksite.city} - {order.worksite.name}
                </Typography>
            </Box>
            {isEditMode ? (
                <Box m={2} sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography variant="h6">
                        Sélectionnez la date souhaitée
                    </Typography>
                    <DateTimePickerComponent
                        selectedDateTime={selectedDateTime}
                        setSelectedDateTime={setSelectedDateTime}
                    />
                </Box>
            ) : (
                <Box m={2}>
                    <Typography>
                        Date prévisionnelle :{" "}
                        {newOrder && newOrder.date_time
                            ? new Date(newOrder.date_time).toLocaleString()
                            : "N/A"}
                    </Typography>
                </Box>
            )}
            <Box m={2}>
                <DisplayOrder
                    order={order}
                    isEditMode={isEditMode}
                    newOrderLines={newOrderLines}
                    setNewOrderLines={setNewOrderLines}
                    isAddCartVisible={isAddCartVisible}
                    setIsAddCartVisible={setIsAddCartVisible}
                />
            </Box>
            {order.status === "envoyée" ? (
                <Box
                    m={5}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5" color={theme.palette.primary.main}>
                        Commande envoyée, en attente de confirmation
                    </Typography>
                </Box>
            ) : (
                <Box m={2}>
                    {isEditMode ? (
                        <Box>
                            <Button
                                variant="contained"
                                onClick={() => setIsEditMode(false)}
                                style={{ marginRight: "10px" }}
                            >
                                Mettre à jour
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleAbort}
                                style={{
                                    color: theme.palette.secondary.main,
                                }}
                            >
                                Annuler
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleUpdate}
                            style={{ marginRight: "10px" }}
                        >
                            Modifier
                        </Button>
                    )}
                    {canEmployeeValidate() ? (
                        <Box m={2}>
                            <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                                style={{
                                    display: canEmployeeValidate()
                                        ? "flex"
                                        : "none",
                                }}
                            >
                                <Grid item>
                                    <OrderValidationButton
                                        isOrderLinesUpdated={
                                            isOrderLinesUpdated
                                        }
                                        order={newOrder}
                                        orderLines={
                                            isOrderLinesUpdated
                                                ? newOrderLines
                                                : orderLines
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <OrderRejectButton
                                        isOrderLinesUpdated={
                                            isOrderLinesUpdated
                                        }
                                        order={newOrder}
                                        orderLines={
                                            isOrderLinesUpdated
                                                ? newOrderLines
                                                : orderLines
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ) : (
                        <Box
                            m={5}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h5"
                                color={theme.palette.primary.main}
                            >
                                En attente de validation d'un supérieur
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default OrderContainer;
