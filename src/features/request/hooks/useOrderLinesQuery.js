import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useOrderLinesQuery = (orderId) => {
    const axiosPrivate = useAxiosPrivate();

    const getOrderLinesForOrder = async () => {
        try {
            const response = await axiosPrivate.get(
                `/requests/order/lines/${orderId}`,
                {},
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la récupération des commandes.",
            );
        }
    };

    const { isError, isLoading, data, error } = useQuery(
        "order-lines",
        getOrderLinesForOrder,
    );
    return {
        isOrderLinesError: isError,
        isOrderLinesLoading: isLoading,
        orderLines: data,
        error: error,
    };
};

export default useOrderLinesQuery;
