import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useValidatorsForWorksiteQuery = (worksiteId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchWorksiteValidators = async (worksiteId) => {
        try {
            const response = await axiosPrivate.get(
                `/managements/get-validator-for-worksite/${worksiteId}/`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    return useQuery(["validators-for-worksite", worksiteId], () =>
        fetchWorksiteValidators(worksiteId),
    );
};

export default useValidatorsForWorksiteQuery;
