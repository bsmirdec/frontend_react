import React, { useState } from "react";
import {
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
} from "@material-ui/core";

const PermissionsDisplay = ({ permissions }) => {
    // State pour stocker les permissions
    const [permissionsState, setPermissionsState] = useState(permissions);
    // State pour indiquer si le mode d'édition est activé
    const [isEditMode, setIsEditMode] = useState(false);

    // Gestionnaire d'événements pour la mise à jour des permissions
    const handleUpdatePermissions = () => {
        // Mettez ici votre logique pour la mise à jour des permissions côté serveur si nécessaire
        // Par exemple, vous pouvez envoyer les nouvelles valeurs de permissionsState au serveur via une API.
        // Pour cet exemple, nous allons simplement afficher les nouvelles permissions dans la console.
        console.log("Nouvelles permissions :", permissionsState);
        // Désactiver le mode d'édition après avoir validé les modifications
        setIsEditMode(false);
    };

    return (
        <div>
            <Typography variant="h6">Permissions Utilisateur</Typography>
            {Object.entries(permissionsState).map(([permission, value]) => (
                <div key={permission}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={value}
                                disabled={!isEditMode}
                                onChange={() => {
                                    // Mettre à jour l'état de la permission lorsque la case à cocher est modifiée
                                    setPermissionsState((prevState) => ({
                                        ...prevState,
                                        [permission]: !prevState[permission],
                                    }));
                                }}
                            />
                        }
                        label={permission}
                    />
                </div>
            ))}
            {isEditMode ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdatePermissions}
                >
                    Valider
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditMode(true)}
                >
                    Mettre à jour
                </Button>
            )}
        </div>
    );
};

export default PermissionsDisplay;
