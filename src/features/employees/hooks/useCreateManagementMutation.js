import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

class ManagementAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = "ManagementAlreadyExists";
    }
}

const useCreateManagementMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const createManagement = async (newManagementData) => {
        try {
            console.log(newManagementData);
            const response = await axiosPrivate.post(
                "/managements/create",
                newManagementData,
            );
            return response.data;
        } catch (error) {
            if (error.response.status === 400) {
                throw new ManagementAlreadyExists(error.response.data.detail);
            } else {
                throw new Error(
                    "Une erreur s'est produite lors de la création de l'affectation.",
                );
            }
        }
    };

    return useMutation(createManagement, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("worksites-for-employee");
            return data;
        },
    });
};

export default useCreateManagementMutation;
