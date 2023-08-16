import { useQuery } from "react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const useStaffListQuery = (userId) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchStaffList = async () => {
        try {
            const response = await axiosPrivate.get(`users/${userId}/staff`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return useQuery(["staff", userId], () => fetchStaffList());
};

export default useStaffListQuery;
