import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useWorksiteOptionsQuery = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchWorksiteOptions = async () => {
        try {
            const response = await axiosPrivate.get("worksites/options");
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const { data, isLoading, isError, error } = useQuery(
        "worksite-options",
        () => fetchWorksiteOptions(),
        {},
    );
    return {
        worksiteOptions: data,
        isWorksiteOptionsLoading: isLoading,
        isWorksiteOptionsError: isError,
        worksiteOptionsError: error,
    };
};

export default useWorksiteOptionsQuery;
