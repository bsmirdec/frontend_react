import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useProductsListQuery = () => {
    const axiosPrivate = useAxiosPrivate();

    const { data, isLoading, isError, error } = useQuery(
        ["products"],
        async () => {
            const response = await axiosPrivate.get("/products/");
            return response.data;
        },
    );
    return {
        products: data,
        isProductsLoading: isLoading,
        isProductsError: isError,
        error: error,
    };
};

export default useProductsListQuery;
