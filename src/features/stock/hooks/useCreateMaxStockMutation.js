import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useCreateMaxStockMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const createMaxStock = async (maxStock) => {
        try {
            const response = await axiosPrivate.post(
                "/stocks/worksite/max/create",
                {
                    worksite_max_stock: maxStock,
                },
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la création du stock max.",
            );
        }
    };

    return useMutation(createMaxStock, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(
                "max-stocks-for-worksite",
                "notifications",
            );
            return data;
        },
    });
};

export default useCreateMaxStockMutation;
