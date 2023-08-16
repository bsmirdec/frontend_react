import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useUpdatePermissionsMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const updatePermissions = async (updatedEmployee) => {
        try {
            const response = await axiosPrivate.put(
                `employees/${updatedEmployee.employee_id}/update`,
                updatedEmployee,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return useMutation(
        "updated-permissions",
        (updatedEmployee) => updatePermissions(updatedEmployee),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("permissions");
            },
        },
    );
};

export default useUpdatePermissionsMutation;
