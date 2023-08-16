import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import { useQuery } from "react-query";

export const useEmployee = (userId) => {
    const axiosPrivate = useAxiosPrivate();
    return useQuery(["employee", userId], async () => {
        if (!userId) {
            return null;
        }
        const response = await axiosPrivate.get(`users/${userId}/employee`);
        return response.data;
    });
};
