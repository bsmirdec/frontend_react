import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useOrderListForEmployeeQuery = (employeeId) => {
    const axiosPrivate = useAxiosPrivate();

    const getOrderForEmployee = async () => {
        try {
            const response = await axiosPrivate.get(
                `/requests/orders/${employeeId}`,
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error(
                    "Une erreur s'est produite lors de la récupération des commandes.",
                );
            }
        }
    };

    return useQuery("orders", getOrderForEmployee);
};

export default useOrderListForEmployeeQuery;
