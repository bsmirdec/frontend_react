import { useMutation, useQueryClient } from "react-query";
import api from "../services/api";

const useUpdateWorksiteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        "updated-worksite",
        (updatedWorksite) => api.updateWorksite(updatedWorksite),
        {
            onSuccess: () => {
                // Invalidate and refetch the worksite list query
                queryClient.invalidateQueries("worksites");
            },
        },
    );
};

export default useUpdateWorksiteMutation;
