import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useConfirmDeliveryMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const confirmDelivery = async (data) => {
        try {
            const { delivery, status } = data;
            const response = await axiosPrivate.put(
                `/deliveries/${delivery.delivery_id}/confirm`,
                {
                    delivery: delivery,
                    status: status,
                },
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la confirmation de la livraison.",
            );
        }
    };

    return useMutation(confirmDelivery, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("deliveries", "notifications");
            return data;
        },
    });
};

export default useConfirmDeliveryMutation;
