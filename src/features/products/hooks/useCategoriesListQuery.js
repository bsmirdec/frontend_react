import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useCategoriesListQuery = () => {
    const axiosPrivate = useAxiosPrivate();

    return useQuery(["categories"], async () => {
        const response = await axiosPrivate.get("/products/categories");
        return response.data;
    });
};

export default useCategoriesListQuery;
