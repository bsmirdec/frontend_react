import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useDeleteNotificationMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const deleteNotification = async (notificationId) => {
        try {
            const response = await axiosPrivate.delete(
                `/notifications/${notificationId}/delete`,
            );
            return response.data;
        } catch (error) {
            throw new Error(
                "Une erreur s'est produite lors de la suppression de la notification.",
            );
        }
    };

    return useMutation(deleteNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries("notifications");
        },
    });
};

export default useDeleteNotificationMutation;
