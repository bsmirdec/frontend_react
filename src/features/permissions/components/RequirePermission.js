import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useBusiness } from "../context/BusinessContext";

const RequirePermission = ({ children, allowedPermissions }) => {
    const { businessData } = useBusiness();
    const location = useLocation();

    // Vérifier les permissions si elles sont fournies
    if (allowedPermissions && allowedPermissions.length > 0) {
        const userPermissions = businessData.permissions || {};

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

export default RequirePermission;
