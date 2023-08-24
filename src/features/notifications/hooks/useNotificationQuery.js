import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useNotificationQuery = (userId) => {
    const axiosPrivate = useAxiosPrivate();

    return useQuery(["notifications", userId], async () => {
        const response = await axiosPrivate.get(`/notifications/${userId}`);
        return response.data;
    });
};

export default useNotificationQuery;
