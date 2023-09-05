import { useNavigate } from "react-router-dom";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useDeleteOrderLinesMutation from "../hooks/useDeleteOrderLinesMutation";
import useCreateOrderLinesMutation from "../hooks/useCreateOrderLinesMutation";
import useUpdateOrderMutation from "../hooks/useUpdateOrderMutation";
import { Button } from "@mui/material";

const OrderValidationButton = ({ isOrderLinesUpdated, order, orderLines }) => {
    const { businessData } = useBusiness();
    const navigate = useNavigate();
    const updateOrderMutation = useUpdateOrderMutation();
    const deleteOrderLinesMutation = useDeleteOrderLinesMutation();
    const createOrderLinesMutation = useCreateOrderLinesMutation();

    const handleValidate = async () => {
        // Si les lignes de commandes sont modifiées, on supprime les anciennes et on crée les nouvelles
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

        // Une fois les lignes de commandes mises à jour, on met à jour la commande
        // La validation est effectuée selon le seuil de la commande

        try {
            console.log(order);
            const response = await updateOrderMutation.mutateAsync({
                order: order,
                employee_id: businessData.employeeId,
            });
            if (response) {
                navigate("/request/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button variant="contained" onClick={handleValidate}>
            Valider la commande
        </Button>
    );
};

export default OrderValidationButton;
