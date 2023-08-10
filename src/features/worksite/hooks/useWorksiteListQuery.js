import { useQuery } from "react-query";
import api from "../services/api";

const useWorksiteListQuery = () => {
    return useQuery("worksites", () => api.fetchWorksiteList(), {
        // You can add additional options here
    });
};

export default useWorksiteListQuery;
