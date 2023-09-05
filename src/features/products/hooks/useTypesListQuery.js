import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useTypesListQuery = () => {
    const axiosPrivate = useAxiosPrivate();

    return useQuery(["types"], async () => {
        const response = await axiosPrivate.get("/products/types");
        return response.data;
    });
};

export default useTypesListQuery;
