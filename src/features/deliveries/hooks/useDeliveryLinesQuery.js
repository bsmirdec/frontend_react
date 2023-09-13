import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useDeliveryLinesQuery = (deliveryId) => {
    const axiosPrivate = useAxiosPrivate();

    const getDeliveryLinesForOrder = async () => {
        try {
            const response = await axiosPrivate.get(
                `/deliveries/lines/${deliveryId}`,
                {},
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la récupération des livraisons.",
            );
        }
    };

    const { data, isLoading, isError, error } = useQuery(
        "delivery-lines",
        getDeliveryLinesForOrder,
    );
    return {
        deliveryLines: data,
        isDeliveryLinesLoading: isLoading,
        isDeliveryLinesError: isError,
        deliveryLinesError: error,
    };
};

export default useDeliveryLinesQuery;
