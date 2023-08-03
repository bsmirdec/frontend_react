// src/features/auth/containers/AuthContainer.js

import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ConfirmationForm from "../components/ConfirmationForm";
import Logout from "../components/Logout";

const AuthContainer = () => {
    const { userId } = useContext(AuthContext);
    const location = useLocation();

    // Vérifiez si l'utilisateur est déjà authentifié, si oui, redirigez vers la page d'accueil
    if (userId) {
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
