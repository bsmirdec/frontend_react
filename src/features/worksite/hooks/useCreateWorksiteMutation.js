import { useMutation, useQueryClient } from "react-query";
import api from "../services/api";

const useCreateWorksiteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (newWorksiteData) => api.post("/worksites/create", newWorksiteData),
        {
            onSuccess: () => {
                // Invalidate and refetch the worksite list query
                queryClient.invalidateQueries("worksites");
            },
        },
    );
};

export default useCreateWorksiteMutation;
