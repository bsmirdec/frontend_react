import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useNotificationQuery = (userId) => {
    const axiosPrivate = useAxiosPrivate();

    const { data, isLoading, isError, error } = useQuery(
        ["notifications", userId],
        async () => {
            const response = await axiosPrivate.get(`/notifications/${userId}`);
            return response.data;
        },
    );
    return {
        notifications: data,
        isNotificationsLoading: isLoading,
        isNotificationsError: isError,
        notificationsError: error,
    };
};

export default useNotificationQuery;
