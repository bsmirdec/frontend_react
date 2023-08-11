import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import api from "../services/api";
import useAuth from "../../auth/hooks/useAuth";

const useWorksiteListQuery = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const fetchWorksiteList = async () => {
        try {
            console.log(auth);
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
