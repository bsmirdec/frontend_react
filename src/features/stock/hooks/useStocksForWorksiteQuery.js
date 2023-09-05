import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useStocksForWorksiteQuery = (worksiteId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchWorksiteStocks = async (worksiteId) => {
        try {
            const response = await axiosPrivate.get(
                `/stocks/worksite/${worksiteId}`,
            );
            return response.data;
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                throw error.response.data.message;
            } else if (error.message) {
                throw error.message;
            } else {
                throw error;
            }
        }
    };
    return useQuery(
        ["stocks-for-worksite", worksiteId],
        () => fetchWorksiteStocks(worksiteId),
        {
            // You can add additional options here
        },
    );
};

export default useStocksForWorksiteQuery;
