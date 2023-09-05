import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useCreateOrderLinesMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const createOrderLines = async (data) => {
        try {
            const { order, orderLines } = data;
            const response = await axiosPrivate.post(
                "/requests/order/lines/create",
                {
                    order: order,
                    order_lines: orderLines,
                },
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la création de la commande.",
            );
        }
    };

    return useMutation(createOrderLines, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("orders", "notifications");
            return data;
        },
    });
};

export default useCreateOrderLinesMutation;
