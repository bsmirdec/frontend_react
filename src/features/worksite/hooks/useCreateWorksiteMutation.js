import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import useCreateWorksiteNotificationMutation from "../../notifications/hooks/useCreateWorksiteNotificationMutation";

class WorksiteAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = "WorksiteAlreadyExists";
    }
}

const useCreateWorksiteMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const createWorksite = async (newWorksiteData) => {
        try {
            console.log(newWorksiteData);
            const response = await axiosPrivate.post(
                "/worksites/create",
                newWorksiteData,
            );
            return response.data;
        } catch (error) {
            if (error.response.status === 400) {
                throw new WorksiteAlreadyExists(error.response.data.detail);
            } else {
                throw new Error(
                    "Une erreur s'est produite lors de la création du chantier.",
                );
            }
        }
    };

    return useMutation(createWorksite, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("worksites", "notifications");
            return data;
        },
    });
};

export default useCreateWorksiteMutation;
