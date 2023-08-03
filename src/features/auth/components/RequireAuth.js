import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { PERMISSIONS } from "../../permissions/PERMISSIONS";

const RequireAuth = ({ children, allowedPermissions }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(auth);

    // Vérifier si l'utilisateur est authentifié
    if (!auth || !auth.accessToken) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // Vérifier les permissions si elles sont fournies
    if (allowedPermissions && allowedPermissions.length > 0) {
        const userPermissions = auth.permissions || {};

        // Vérifier chaque permission individuellement
        for (const permission of allowedPermissions) {
            if (
                !userPermissions.hasOwnProperty(permission) ||
                !userPermissions[permission]
            ) {
                return (
                    <Navigate
                        to="/unauthorized/"
                        state={{ from: location }}
                        replace
                    />
                );
            }
        }
    }

    // Rendre le contenu enfant s'il est autorisé
    return children;
};

export default RequireAuth;

// useEffect(() => {
//     if (!auth?.userId) {
//         localStorage.setItem("redirectAfterLogin", location.pathname);
//         navigate("/auth/login", { replace: true });
//     }
// }, [auth, navigate, location.pathname]);

// return auth?.userId ? children : <div>Authentification incorrecte</div>;
