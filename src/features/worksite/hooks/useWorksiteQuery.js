import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import api from "../services/api";

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
    return useQuery(
        ["worksite", worksiteId],
        () => fetchWorksiteDetails(worksiteId),
        {
            // You can add additional options here
        },
    );
};

export default useWorksiteQuery;
