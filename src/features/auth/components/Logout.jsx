import React, { useEffect } from "react";
import axiosInstance from "../../../services/api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Logout() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    useEffect(() => {
        const logoutUser = async () => {
            try {
                console.log(auth);
                await axiosInstance.post("token/blacklist/", {
                    refresh_token: auth.refreshToken,
                    user_id: auth.userId,
                });

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user_id");
                localStorage.removeItem("email");
                localStorage.removeItem("password");

                axiosInstance.defaults.headers["Authorization"] = null;

                navigate("/auth/login");
            } catch (error) {
                console.error("Erreur lors de la déconnexion :", error);
            }
        };

        logoutUser();
    }, [navigate]);

    return <div>Déconnexion</div>;
}
