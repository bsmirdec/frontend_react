import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useDeleteWorksiteMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const deleteWorksite = async (worksiteId) => {
        try {
            const response = await axiosPrivate.get(
                `/worksites/${worksiteId}/delete`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return useMutation(
        "deleted-worksite",
        (worksiteId) => deleteWorksite(worksiteId),
        {
            onSuccess: () => {
                // Invalidate and refetch the worksite list query
                queryClient.invalidateQueries("worksites");
            },
        },
    );
};

export default useDeleteWorksiteMutation;
