import React from "react";
import { Link } from "react-router-dom";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useDeliveryListForEmployeeQuery from "../hooks/useDeliveryListForEmployeeQuery";
import DateTimeDisplay from "../../../components/forms/DateTimeDisplay";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const DeliveryTable = () => {
    const { businessData } = useBusiness();
    const {
        deliveries,
        isDeliveriesLoading,
        isDeliveriesError,
        deliveriesError,
    } = useDeliveryListForEmployeeQuery(businessData.employeeId);

    if (isDeliveriesLoading) {
        return <Loading />;
    }

    if (isDeliveriesError) {
        return <ErrorMessage message={deliveriesError.message} />;
    }

    if (!deliveries || !Array.isArray(deliveries)) {
        return <p>Pas de livraison</p>;
    }

    const filteredDeliveries = deliveries.filter(
        (delivery) => delivery.status !== "terminée",
    );

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Référence</TableCell>
                        <TableCell>Chantier</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredDeliveries.map((delivery) => (
                        <TableRow key={delivery.delivery_id}>
                            <TableCell>
                                <Link to={`/delivery/${delivery.delivery_id}`}>
                                    Livraison n°{delivery.delivery_id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                commande n°{delivery.order.order_id}
                            </TableCell>
                            <TableCell>
                                {delivery.worksite.city} -{" "}
                                {delivery.worksite.name}
                            </TableCell>
                            <TableCell>
                                <DateTimeDisplay
                                    dateTime={delivery.expected_date_time}
                                />
                            </TableCell>
                            <TableCell>{delivery.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DeliveryTable;
