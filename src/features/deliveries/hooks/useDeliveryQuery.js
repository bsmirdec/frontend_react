import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useDeliveryQuery = (deliveryId) => {
    const axiosPrivate = useAxiosPrivate();

    const getDelivery = async () => {
        try {
            const response = await axiosPrivate.get(
                `/deliveries/${deliveryId}`,
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la récupération de la livraison.",
            );
        }
    };

    return useQuery("delivery", getDelivery);
};

export default useDeliveryQuery;
