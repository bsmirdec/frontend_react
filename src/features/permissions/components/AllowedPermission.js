import React from "react";
import { useBusiness } from "../context/BusinessContext";

const AllowedPermission = ({ children, allowedPermissions }) => {
    const { businessData } = useBusiness();

    // Vérifier les permissions si elles sont fournies
    if (allowedPermissions && allowedPermissions.length > 0) {
        const userPermissions = businessData.permissions || {};

        // Vérifier chaque permission individuellement
        for (const permission of allowedPermissions) {
            if (
                !userPermissions.hasOwnProperty(permission) ||
                !userPermissions[permission]
            ) {
                return null; // Rend null si la permission n'est pas satisfaite
            }
        }
    }

    // Rendre le contenu enfant s'il est autorisé
    return children;
};

export default AllowedPermission;
