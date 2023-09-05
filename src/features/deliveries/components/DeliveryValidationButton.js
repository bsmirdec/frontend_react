import { useNavigate } from "react-router-dom";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useUpdateDeliveryMutation from "../hooks/useUpdateDeliveryMutation";
import useConfirmDeliveryMutation from "../hooks/useConfirmDeliveryMutation";
import useCreateDeliveryLinesMutation from "../hooks/useCreateDeliveryLinesMutation";
import useDeleteDeliveryLinesMutation from "../hooks/useDeleteDeliveryLinesMutation";
import { Button } from "@mui/material";
import { useEffect } from "react";

const DeliveryValidationButton = ({
    delivery,
    deliveryLines,
    isDeliveryLinesUpdated,
}) => {
    const { businessData } = useBusiness();
    const navigate = useNavigate();
    const updateDeliveryMutation = useUpdateDeliveryMutation();
    const confirmDeliveryMutation = useConfirmDeliveryMutation();
    const createDeliveryLinesMutation = useCreateDeliveryLinesMutation();
    const deleteDeliveryLinesMutation = useDeleteDeliveryLinesMutation();

    const handleValidate = async () => {
        // Si les lignes de commandes sont modifiées, on supprime les anciennes et on crée les nouvelles
        if (isDeliveryLinesUpdated) {
            const newDeliveryLines = deliveryLines.map((obj) => {
                const { delivery_line_id, ...rest } = obj;
                return rest;
            });
            console.log(newDeliveryLines);
            try {
                const deleteResponse =
                    await deleteDeliveryLinesMutation.mutateAsync(
                        delivery.delivery_id,
                    );
                if (deleteResponse) {
                    try {
                        const response =
                            await createDeliveryLinesMutation.mutateAsync({
                                delivery: delivery,
                                deliveryLines: newDeliveryLines,
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

        // Une fois les lignes de livraison sont mises à jour, on confirme la livraison
        // Si les quantités sont différentes, alors la livraison est incomplète

        try {
            console.log(delivery);
            const response = await confirmDeliveryMutation.mutateAsync({
                delivery: delivery,
                status: isDeliveryLinesUpdated ? "uncompleted" : "completed",
            });
            if (response) {
                navigate("/worksite/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button variant="contained" onClick={handleValidate}>
            Valider
        </Button>
    );
};

export default DeliveryValidationButton;
