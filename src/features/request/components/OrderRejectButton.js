import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteOrderLinesMutation from "../hooks/useDeleteOrderLinesMutation";
import useCreateOrderLinesMutation from "../hooks/useCreateOrderLinesMutation";
import useUpdateOrderMutation from "../hooks/useUpdateOrderMutation";
import useCreateWorksiteNotificationMutation from "../../notifications/hooks/useCreateWorksiteNotificationMutation";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";

const OrderRejectButton = ({ isOrderLinesUpdated, order, orderLines }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const updateOrderMutation = useUpdateOrderMutation();
    const deleteOrderLinesMutation = useDeleteOrderLinesMutation();
    const createOrderLinesMutation = useCreateOrderLinesMutation();
    const createWorksiteNotificationMutation =
        useCreateWorksiteNotificationMutation();

    const handleValidate = async () => {
        if (isOrderLinesUpdated) {
            const newOrderLines = orderLines.map((obj) => {
                const { order_line_id, ...rest } = obj;
                return rest;
            });
            console.log(newOrderLines);
            try {
                const deleteResponse =
                    await deleteOrderLinesMutation.mutateAsync(order.order_id);
                if (deleteResponse) {
                    try {
                        const response =
                            await createOrderLinesMutation.mutateAsync({
                                order: order,
                                orderLines: newOrderLines,
                            });
                        console.log(response);
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        try {
            const worksite = order.worksite;
            order.worksite = order.worksite.worksite_id;
            order.validation1 = true;
            order.validation2 = true;
            order.validation3 = true;
            order.status = "send";
            const response = await updateOrderMutation.mutateAsync(order);
            if (response) {
                const notif =
                    await createWorksiteNotificationMutation.mutateAsync({
                        worksite_id: worksite.worksite_id,
                        content: `Commande n°${order.order_id} validée et envoyée pour le chantier: ${worksite.name} - ${worksite.city}`,
                        link: `/request/order/${order.order_id}`,
                    });
                console.log(notif);
                navigate("/request/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button
            variant="contained"
            onClick={handleValidate}
            style={{
                backgroundColor: theme.palette.secondary.main,
            }}
        >
            Refuser
        </Button>
    );
};

export default OrderRejectButton;
