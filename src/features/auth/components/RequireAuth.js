import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children, allowedPermissions }) => {
    const { auth } = useAuth();
    const location = useLocation();

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
