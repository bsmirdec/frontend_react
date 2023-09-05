import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useUpdateDeliveryMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const updateDelivery = async (data) => {
        try {
            const { delivery, status, employee_id } = data;
            const response = await axiosPrivate.put(
                `/deliveries/${delivery.delivery_id}/update`,
                {
                    delivery: delivery,
                    status: status,
                    employee_id: employee_id,
                },
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la modification de la livraison.",
            );
        }
    };

    return useMutation(updateDelivery, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("deliveries", "notifications");
            return data;
        },
    });
};

export default useUpdateDeliveryMutation;
