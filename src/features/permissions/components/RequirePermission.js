import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBusiness } from "../context/BusinessContext";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import Button from "@mui/material/Button";

const RequirePermission = ({ children, allowedPermissions }) => {
    const { businessData } = useBusiness();
    const location = useLocation();
    const navigate = useNavigate();

    const message = "Autorisation nécessaire";
    const goBack = () => navigate(-1);

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
                    <div>
                        <ErrorMessage message={message} />
                        <Button
                            onClick={goBack}
                            to="/"
                            variant="contained"
                            color="primary"
                        >
                            Retour
                        </Button>
                    </div>
                );
            }
        }
    }

    // Rendre le contenu enfant s'il est autorisé
    return children;
};

export default RequirePermission;
