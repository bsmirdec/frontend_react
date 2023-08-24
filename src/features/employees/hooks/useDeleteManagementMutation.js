import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useDeleteManagementMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const deleteManagement = async (data) => {
        try {
            console.log(data);
            const worksiteId = data.worksiteId;
            const employeeId = data.employeeId;
            const response = await axiosPrivate.delete(
                `/managements/${worksiteId}/${employeeId}/delete`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return useMutation(deleteManagement, {
        onSuccess: () => {
            queryClient.invalidateQueries("worksites-for-employee");
            queryClient.invalidateQueries("employees-for-worksite");
        },
        mutationKey: "managements-delete",
    });
};

export default useDeleteManagementMutation;
