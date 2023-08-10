import { useQuery } from "react-query";
import api from "../services/api";

const useWorksiteOptionsQuery = () => {
    return useQuery("worksite-options", () => api.fetchWorksiteOptions(), {});
};

export default useWorksiteOptionsQuery;
