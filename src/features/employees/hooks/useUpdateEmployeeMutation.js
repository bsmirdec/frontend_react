import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useUpdateEmployeeMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const updateEmployee = async (updatedEmployee) => {
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
        "update-employee",
        (updatedEmployee) => updateEmployee(updatedEmployee),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("permissions", "staff");
            },
        },
    );
};

export default useUpdateEmployeeMutation;
