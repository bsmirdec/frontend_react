import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useDeleteOrderLinesMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const deleteOrderLines = async (orderId) => {
        try {
            console.log(orderId);
            const response = await axiosPrivate.delete(
                `/requests/order/lines/${orderId}/delete`,
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la création de la commande.",
            );
        }
    };

    return useMutation(deleteOrderLines, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("orders", "notifications");
            return data;
        },
    });
};

export default useDeleteOrderLinesMutation;
