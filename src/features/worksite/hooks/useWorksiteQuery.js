import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useWorksiteQuery = (worksiteId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchWorksiteDetails = async (worksiteId) => {
        try {
            const response = await axiosPrivate.get(
                `/worksites/${worksiteId}/get`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    const { data, isLoading, isError, error } = useQuery(
        ["worksite", worksiteId],
        () => fetchWorksiteDetails(worksiteId),
        {
            // You can add additional options here
        },
    );
    return {
        worksite: data,
        isWorksiteLoading: isLoading,
        isWorksiteError: isError,
        worksiteError: error,
    };
};

export default useWorksiteQuery;
