import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useProductsListQuery = () => {
    const axiosPrivate = useAxiosPrivate();

    return useQuery(["products"], async () => {
        const response = await axiosPrivate.get("/products/");
        return response.data;
    });
};

export default useProductsListQuery;
