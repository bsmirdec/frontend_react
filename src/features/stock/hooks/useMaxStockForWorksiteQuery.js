import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useMaxStocksForWorksiteQuery = (worksiteId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchWorksiteMaxStocks = async (worksiteId) => {
        try {
            const response = await axiosPrivate.get(
                `/stocks/worksite/max/${worksiteId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    const { data, isLoading, isError, error } = useQuery(
        ["max-stocks-for-worksite", worksiteId],
        () => fetchWorksiteMaxStocks(worksiteId),
        {
            // You can add additional options here
        },
    );
    return {
        maxStocks: data,
        isMaxStocksLoading: isLoading,
        isMaxStocksError: isError,
        maxStocksError: error,
    };
};

export default useMaxStocksForWorksiteQuery;
