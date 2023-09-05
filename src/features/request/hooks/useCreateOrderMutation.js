import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useCreateOrderMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const createOrder = async (data) => {
        try {
            const { order, order_lines, employee_id } = data;
            const response = await axiosPrivate.post("/requests/order/create", {
                order: order,
                order_lines: order_lines,
                employee_id: employee_id,
            });
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la création de la commande.",
            );
        }
    };

    return useMutation(createOrder, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("orders", "notifications");
            return data;
        },
    });
};

export default useCreateOrderMutation;
