import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const fetchApi = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Utilisez "Accept" au lieu de "accept"
    },
});

export const getData = async () => {
    const response = await fetchApi.get("/data");
    return response.data;
};

export const addData = async (data) => {
    return await fetchApi.post("/data", data);
};
