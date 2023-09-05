import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useOrderQuery = (orderId) => {
    const axiosPrivate = useAxiosPrivate();

    const getOrder = async () => {
        try {
            const response = await axiosPrivate.get(
                `/requests/order/${orderId}`,
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la récupération des commandes.",
            );
        }
    };

    const { isError, isLoading, data, error } = useQuery("order", getOrder);

    return {
        isOrderError: isError,
        isOrderLoading: isLoading,
        order: data,
        error: error,
    };
};

export default useOrderQuery;
