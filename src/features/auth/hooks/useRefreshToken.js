import { axiosInstance } from "../service/axiosPrivate";
import useAuth from "./useAuth";
import jwtDecode from "jwt-decode";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const refreshToken = auth?.refreshToken;
        // || localStorage.getItem("refresh");
        const response = await axiosInstance.post("/token/refresh/", {
            refresh: refreshToken,
        });
        setAuth((prev) => {
            return {
                ...prev,
                accessToken: response.data.access,
                refreshToken: response.data.refresh,
                userId: jwtDecode(response.data.access).user_id,
            };
        });
        // localStorage.setItem("refresh", response.data.refresh);
        return response.data.access;
    };
    return refresh;
};

export default useRefreshToken;
