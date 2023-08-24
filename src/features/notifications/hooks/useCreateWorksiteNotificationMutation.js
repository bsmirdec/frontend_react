import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useCreateWorksiteNotificationMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const createWorksiteNotification = async (notificationData) => {
        try {
            const response = await axiosPrivate.post(
                `/notifications/${notificationData.worksite_id}/create`,
                notificationData,
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la création de la notification.",
            );
        }
    };

    return useMutation(createWorksiteNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries("notifications");
        },
    });
};

export default useCreateWorksiteNotificationMutation;
