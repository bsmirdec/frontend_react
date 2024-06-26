import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useStaffListQuery = (userId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchStaffList = async () => {
        try {
            const response = await axiosPrivate.get(`users/${userId}/staff`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const { data, isLoading, isError, error } = useQuery(
        ["staff", userId],
        () => fetchStaffList(),
    );
    return {
        staffData: data,
        isStaffLoading: isLoading,
        isStaffError: isError,
        staffError: error,
    };
};

export default useStaffListQuery;
