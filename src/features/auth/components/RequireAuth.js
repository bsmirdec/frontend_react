import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // Vérifier si l'utilisateur est authentifié
    if (!auth || !auth.accessToken) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // Rendre le contenu enfant s'il est autorisé
    return children;
};

export default RequireAuth;
