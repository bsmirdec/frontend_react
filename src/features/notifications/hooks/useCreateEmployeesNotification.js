import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useCreateEmployeesNotificationMutation = () => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const createEmployeesNotification = async (notificationData) => {
        try {
            const response = await axiosPrivate.post(
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

    return useMutation(createEmployeesNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries("notifications");
        },
    });
};

export default useCreateEmployeesNotificationMutation;
