// src/features/auth/containers/AuthContainer.js

import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ConfirmationForm from "../components/ConfirmationForm";
import Logout from "../components/Logout";

const AuthContainer = () => {
    const { accessToken } = useAuth();
    const location = useLocation();

    // Vérifiez si l'utilisateur est déjà authentifié, si oui, redirigez vers la page d'accueil
    if (accessToken) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            {location.pathname === "/auth/login" && <LoginForm />}
            {location.pathname === "/auth/register" && <RegisterForm />}
            {location.pathname === "/auth/confirm" && <ConfirmationForm />}
            {location.pathname === "/auth/logout" && <Logout />}
        </div>
    );
};

export default AuthContainer;
