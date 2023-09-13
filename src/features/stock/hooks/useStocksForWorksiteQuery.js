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
            throw error;
        }
    };
    const { data, isLoading, isError, error } = useQuery(
        ["stocks-for-worksite", worksiteId],
        () => fetchWorksiteStocks(worksiteId),
        {
            // You can add additional options here
        },
    );

    return {
        stocks: data,
        isStocksLoading: isLoading,
        isStocksError: isError,
        stocksError: error,
    };
};

export default useStocksForWorksiteQuery;
