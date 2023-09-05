import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useDeliveryListForEmployeeQuery = (employeeId) => {
    const axiosPrivate = useAxiosPrivate();

    const getDeliveryForEmployee = async () => {
        try {
            const response = await axiosPrivate.get(
                `/deliveries/list/${employeeId}`,
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error(
                    "Une erreur s'est produite lors de la récupération des livraisons.",
                );
            }
        }
    };

    return useQuery("deliveries", getDeliveryForEmployee);
};

export default useDeliveryListForEmployeeQuery;
