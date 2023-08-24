import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useUpdateWorksiteMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const updateWorksite = async (updatedWorksite) => {
        try {
            const response = await axiosPrivate.put(
                `/worksites/${updatedWorksite.worksite_id}/update`,
                updatedWorksite,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return useMutation(
        "updated-worksite",
        (updatedWorksite) => updateWorksite(updatedWorksite),
        {
            onSuccess: () => {
                // Invalidate and refetch the worksite list query
                queryClient.invalidateQueries("worksites");
                queryClient.invalidateQueries("worksite");
            },
        },
    );
};

export default useUpdateWorksiteMutation;
