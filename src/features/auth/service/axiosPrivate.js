// axiosPrivate.js

import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    timeout: 5000,
});

export default axiosPrivate;