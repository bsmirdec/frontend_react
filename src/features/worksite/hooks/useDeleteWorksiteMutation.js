import { useMutation, useQueryClient } from "react-query";
import api from "../services/api";

const useDeleteWorksiteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        "updated-worksite",
        (worksiteId) => api.deleteWorksite(worksiteId),
        {
            onSuccess: () => {
                // Invalidate and refetch the worksite list query
                queryClient.invalidateQueries("worksites");
            },
        },
    );
};

export default useDeleteWorksiteMutation;
