import axiosPrivate from "../service/axiosPrivate";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosPrivate.post("token/refresh/", {
            withCredentials: true,
            refresh: auth.refreshToken,
        });
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access);
            return { ...prev, accessToken: response.data.access };
        });
        return response.data.access;
    };
    return refresh;
};

export default useRefreshToken;
