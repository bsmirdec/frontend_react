import { useQuery } from "react-query";
import api from "../services/api";

const useWorksiteQuery = (worksiteId) => {
    return useQuery(
        ["worksite", worksiteId],
        () => api.fetchWorksiteDetails(worksiteId),
        {
            // You can add additional options here
        },
    );
};

export default useWorksiteQuery;
