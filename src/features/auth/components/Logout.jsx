import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

export default function Logout() {
    const navigate = useNavigate();
    const logout = useLogout();
    useEffect(() => {
        const logoutUser = async () => {
            try {
                await logout();
                navigate("/auth/login");
            } catch (error) {
                console.error("Erreur lors de la déconnexion :", error);
            }
        };

        logoutUser();
    }, [navigate, logout]);

    return <div>Déconnexion</div>;
}
