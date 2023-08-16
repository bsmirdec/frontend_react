// import axios from "axios";
// import jwt_decode from "jwt-decode";

// const baseURL = "http://127.0.0.1:8000/api/";

// const axiosInstance = axios.create({
//     baseURL: baseURL,
//     timeout: 5000,
//     headers: {
//         "Content-Type": "application/json",
//         accept: "application/json",
//     },
// });

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//         config.headers["Authorization"] = `JWT ${token}`;
//     }
//     return config;
// });

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async function (error) {
//         const originalRequest = error.config;

//         if (typeof error.response === "undefined") {
//             alert(
//                 "A server/network error occurred. " +
//                     "Looks like CORS might be the problem. " +
//                     "Sorry about this - we will get it fixed shortly.",
//             );
//             return Promise.reject(error);
//         }

//         if (
//             error.response.status === 401 &&
//             originalRequest.url === baseURL + "token/refresh/"
//         ) {
//             window.location.href = "/auth/login/";
//             return Promise.reject(error);
//         }

//         if (
//             error.response.data.code === "token_not_valid" &&
//             error.response.status === 401 &&
//             error.response.statusText === "Unauthorized"
//         ) {
//             const refreshToken = localStorage.getItem("refresh_token");

//             if (refreshToken) {
//                 const tokenParts = jwt_decode(refreshToken);
//                 const now = Math.ceil(Date.now() / 1000);

//                 if (tokenParts.exp > now) {
//                     try {
//                         const response = await axiosInstance.post(
//                             "/token/refresh/",
//                             { refresh: refreshToken },
//                         );
//                         const access = response.data.access;

//                         localStorage.setItem("access_token", access);
//                         axiosInstance.defaults.headers[
//                             "Authorization"
//                         ] = `JWT ${access}`;
//                         originalRequest.headers[
//                             "Authorization"
//                         ] = `JWT ${access}`;

//                         return axiosInstance(originalRequest);
//                     } catch (err) {
//                         console.log(err);
//                     }
//                 } else {
//                     console.log(
//                         "Refresh token is expired",
//                         tokenParts.exp,
//                         now,
//                     );
//                     window.location.href = "/auth/login/";
//                 }
//             } else {
//                 console.log("Refresh token not available.");
//                 window.location.href = "/auth/login/";
//             }
//         }
//         return Promise.reject(error);
//     },
// );

// export default axiosInstance;
