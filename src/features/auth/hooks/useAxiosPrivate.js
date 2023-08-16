import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { axiosPrivate, BASE_URL } from "../service/axiosPrivate";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        // const requestIntercept = axiosPrivate.interceptors.request.use(
        //     (config) => {
        //         console.log(auth);
        //         const token = auth.accessToken;
        //         if (token) {
        //             config.headers["Authorization"] = `JWT ${token}`;
        //         }
        //         console.log(config);
        //         return config;
        //     },
        //     (error) => Promise.reject(error),
        // );

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `JWT ${auth.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        // const responseIntercept = axiosPrivate.interceptors.response.use(
        //     (response) => {
        //         console.log(response);
        //         return response;
        //     },
        //     async (error) => {
        //         if (error.response && error.response.status === 401) {
        //             try {
        //                 console.log("interception 401");
        //                 const newAccessToken = await refresh();
        //                 console.log(newAccessToken);
        //                 error.config.headers.Authorization = `JWT ${newAccessToken}`;
        //                 return axiosPrivate(error.config);
        //             } catch (refreshError) {
        //                 console.log("refreshError");
        //                 throw refreshError;
        //             }
        //         }
        //         return Promise.reject(error);
        //     },
        // );
        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;

                if (typeof error.response === "undefined") {
                    alert(
                        "A server/network error occurred. " +
                            "Looks like CORS might be the problem. " +
                            "Sorry about this - we will get it fixed shortly.",
                    );
                    return Promise.reject(error);
                }

                if (
                    error.response.status === 401 &&
                    error.response.code === "token_not_valid" &&
                    originalRequest.url === BASE_URL + "token/refresh/"
                ) {
                    window.location.href = "/auth/login/";
                    return Promise.reject(error);
                }

                if (
                    error.response.data.code === "token_not_valid" &&
                    error.response.status === 401 &&
                    error.response.statusText === "Unauthorized"
                ) {
                    const refreshToken = auth?.refreshToken;

                    if (refreshToken) {
                        const tokenParts = jwt_decode(refreshToken);
                        const now = Math.ceil(Date.now() / 1000);

                        if (tokenParts.exp > now) {
                            try {
                                const newAccessToken = await refresh();
                                originalRequest.headers[
                                    "Authorization"
                                ] = `JWT ${newAccessToken}`;

                                return axiosPrivate(originalRequest);
                            } catch (error) {
                                console.log(error.message);
                            }
                        } else {
                            console.log(
                                "Refresh token is expired",
                                tokenParts.exp,
                                now,
                            );
                            window.location.href = "/auth/login/";
                        }
                    } else {
                        console.log("Refresh token not available.");
                        window.location.href = "/auth/login/";
                    }
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
