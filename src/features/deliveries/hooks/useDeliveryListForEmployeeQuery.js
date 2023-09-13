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
            throw error;
        }
    };

    const { data, isLoading, isError, error } = useQuery(
        "deliveries",
        getDeliveryForEmployee,
    );
    return {
        deliveries: data,
        isDeliveriesLoading: isLoading,
        isDeliveriesError: isError,
        deliveriesError: error,
    };
};

export default useDeliveryListForEmployeeQuery;
