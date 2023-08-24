import { useQuery } from "react-query";
import { axiosInstance } from "../../auth/service/axiosPrivate";

const useAdministratorListQuery = () => {
    const fetchAdministratorList = async () => {
        try {
            const response = await axiosInstance.get(
                `employees/administrators`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return useQuery(["administrators"], () => fetchAdministratorList());
};

export default useAdministratorListQuery;
