import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useDeleteDeliveryLinesMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const deleteDeliveryLines = async (deliveryId) => {
        try {
            console.log(deliveryId);
            const response = await axiosPrivate.delete(
                `/deliveries/lines/${deliveryId}/delete`,
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la création de la livraison.",
            );
        }
    };

    return useMutation(deleteDeliveryLines, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("deliveries", "notifications");
            return data;
        },
    });
};

export default useDeleteDeliveryLinesMutation;
