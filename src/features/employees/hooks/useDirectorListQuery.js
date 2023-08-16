import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useSiteDirectorListQuery = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchSiteDirectorList = async () => {
        try {
            const response = await axiosPrivate.get(`employees/site-directors`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return useQuery(["site-directors"], () => fetchSiteDirectorList());
};

export default useSiteDirectorListQuery;
