import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useWorksitesForEmployeeQuery = (employeeId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchEmployeeWorksites = async (employeeId) => {
        try {
            const response = await axiosPrivate.get(
                `/managements/get-worksite-for-employee/${employeeId}/`,
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    };
    return useQuery(
        ["worksites-for-employee", employeeId],
        () => fetchEmployeeWorksites(employeeId),
        {
            // You can add additional options here
        },
    );
};

export default useWorksitesForEmployeeQuery;
