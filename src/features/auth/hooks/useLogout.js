import { axiosInstance } from "../service/axiosPrivate";
import useAuth from "./useAuth";

const useLogout = () => {
    const { auth, setAuth } = useAuth();

    const logout = async () => {
        try {
            const response = await axiosInstance.post("/token/blacklist/", {
                refresh_token: auth.refreshToken,
            });
        } catch (error) {
            console.log(error);
        }
        setAuth({});
    };

    return logout;
};

export default useLogout;
