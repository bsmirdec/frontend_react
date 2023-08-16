import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useEmployeesForWorksiteQuery = (worksiteId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchWorksiteEmployees = async (worksiteId) => {
        try {
            const response = await axiosPrivate.get(
                `/managements/get-employee-for-worksite/${worksiteId}/`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    return useQuery(
        ["employees-for-worksite", worksiteId],
        () => fetchWorksiteEmployees(worksiteId),
        {
            // You can add additional options here
        },
    );
};

export default useEmployeesForWorksiteQuery;
