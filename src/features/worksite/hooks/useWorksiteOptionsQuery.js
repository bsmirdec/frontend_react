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

    return useQuery("worksite-options", () => fetchWorksiteOptions(), {});
};

export default useWorksiteOptionsQuery;
