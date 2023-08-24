import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../auth/service/axiosPrivate";

const useCreateAdminNotificationMutation = () => {
    const queryClient = useQueryClient();

    const createAdminNotification = async (notificationData) => {
        try {
            const response = await axiosInstance.post(
                `/notifications/create`,
                notificationData,
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la création de la notification.",
            );
        }
    };

    return useMutation(createAdminNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries("notifications");
        },
    });
};

export default useCreateAdminNotificationMutation;
