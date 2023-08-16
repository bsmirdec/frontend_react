// axiosPrivate.js

import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.code === "token_not_valid"
        ) {
            // Token not valid, redirect to login page
            window.location.href = "/auth/login/";
        }
        return Promise.reject(error);
    },
);
