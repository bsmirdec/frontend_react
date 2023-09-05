import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useUpdateOrderMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const updateOrder = async (data) => {
        try {
            const { order, employee_id } = data;
            const response = await axiosPrivate.put(
                `/requests/order/${order.order_id}/update`,
                {
                    order: order,
                    employee_id: employee_id,
                },
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la modification de la commande.",
            );
        }
    };

    return useMutation(updateOrder, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("orders", "notifications");
            return data;
        },
    });
};

export default useUpdateOrderMutation;
