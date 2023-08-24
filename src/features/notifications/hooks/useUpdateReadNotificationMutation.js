import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useUpdateReadNotificationMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const updateReadNotification = async (notificationId) => {
        try {
            const response = await axiosPrivate.put(
                `/notifications/${notificationId}/read`,
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la mise à jour de la notification.",
            );
        }
    };

    return useMutation(updateReadNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries("notifications");
        },
    });
};

export default useUpdateReadNotificationMutation;
