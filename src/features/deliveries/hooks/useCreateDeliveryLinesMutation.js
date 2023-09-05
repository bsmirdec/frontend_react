import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useCreateDeliveryLinesMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const createDeliveryLines = async (data) => {
        try {
            const { delivery, deliveryLines } = data;
            const response = await axiosPrivate.post(
                "/deliveries/lines/create",
                {
                    delivery: delivery,
                    delivery_lines: deliveryLines,
                },
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la création de la livraison.",
            );
        }
    };

    return useMutation(createDeliveryLines, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("deliveries", "notifications");
            return data;
        },
    });
};

export default useCreateDeliveryLinesMutation;
