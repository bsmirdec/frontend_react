import React from "react";
import { Link } from "react-router-dom";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useOrderListForEmployeeQuery from "../hooks/useOrderListForEmployeeQuery";
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
    Typography,
} from "@mui/material";

const OrderTable = () => {
    const { businessData } = useBusiness();
    const {
        data: orders,
        isLoading,
        isError,
        error,
    } = useOrderListForEmployeeQuery(businessData.employeeId);

    if (isLoading) {
        return <Loading />;
    }

    if (isError || error) {
        return <ErrorMessage message={isError.message || error.message} />;
    }

    if (!orders || !Array.isArray(orders)) {
        return <p>Pas de commande</p>;
    }

    const filteredOrders = orders.filter(
        (order) => order.status !== "confirmé",
    );

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Numéro de commande</TableCell>
                        <TableCell>Chantier</TableCell>
                        <TableCell>Statut</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.order_id}>
                            <TableCell>
                                <Typography>
                                    <Link
                                        to={`/request/order/${order.order_id}`}
                                        state={{ order: order }}
                                    >
                                        {order.order_id}
                                    </Link>
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {order.worksite.city} - {order.worksite.name}
                            </TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderTable;
