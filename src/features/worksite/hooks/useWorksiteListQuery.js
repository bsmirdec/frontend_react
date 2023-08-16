import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useWorksiteListQuery = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchWorksiteList = async () => {
        try {
            const response = await axiosPrivate.get("/worksites/");
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return useQuery("worksites", () => fetchWorksiteList(), {
        // You can add additional options here
    });
};

export default useWorksiteListQuery;
