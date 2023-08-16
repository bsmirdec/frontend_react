import axiosInstance from "../../../services/api/axios";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

const api = {
    fetchWorksiteList: async () => {
        try {
            const response = await axiosInstance.get("/worksites/");
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createWorksite: async (newWorksiteData) => {
        try {
            const response = await axiosInstance.post(
                "/worksites/create",
                newWorksiteData,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    fetchWorksiteDetails: async (worksiteId) => {
        try {
            const response = await api.axiosPrivate.get(
                `/worksites/${worksiteId}/get`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    UpdateWorksite: async (updatedWorksite) => {
        try {
            const response = await axiosInstance.put(
                `/worksites/${updatedWorksite.worksite_id}/update`,
                updatedWorksite,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteWorksite: async (worksiteId) => {
        try {
            const response = await axiosInstance.get(
                `/worksites/${worksiteId}/delete`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    fetchWorksiteOptions: async () => {
        console.log("fetching");
        try {
            const response = await axiosInstance.get("worksites/options");
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default api;
