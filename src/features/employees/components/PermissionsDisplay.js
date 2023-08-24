import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import useUpdatePermissionsMutation from "../hooks/useUpdatePermissionsMutation";
import { PERMISSIONS } from "../../permissions/PERMISSIONS";

const PermissionsDisplay = ({
    selectedEmployee,
    setSelectedEmployee,
    onClose,
}) => {
    const updatePermissions = useUpdatePermissionsMutation();
    const [permissionsState, setPermissionsState] = useState(
        selectedEmployee.permissions,
    );
    const [isEditMode, setIsEditMode] = useState(false);

    const errorRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        setErrorMessage("");
    }, [permissionsState]);

    // Gestionnaire d'événements pour la mise à jour des permissions
    const handleUpdatePermissions = async () => {
        const updatedEmployee = {
            ...selectedEmployee,
            permissions: permissionsState,
        };
        const newEmployee = await updatePermissions.mutateAsync(
            updatedEmployee,
        );
        setSelectedEmployee((prevEmployee) => ({
            ...prevEmployee,
            permissions: newEmployee.permissions,
        }));
        setPermissionsState(newEmployee.permissions);

        setIsEditMode(false);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
            }}
        >
            <ErrorMessage ref={errorRef} message={errorMessage} />
            <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <Typography variant="h6">
                Autorisations de {selectedEmployee.first_name}{" "}
                {selectedEmployee.last_name}
            </Typography>
            {Object.entries(permissionsState).map(([permission, value]) => (
                <div key={permission}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!value}
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
                        label={PERMISSIONS[permission].label}
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
        </Box>
    );
};

export default PermissionsDisplay;
