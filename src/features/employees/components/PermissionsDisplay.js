import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../services/api/axios";
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

const PermissionsDisplay = ({
    selectedEmployee,
    setSelectedEmployee,
    onClose,
}) => {
    const [permissionsState, setPermissionsState] = useState(
        selectedEmployee.permissions,
    );
    const [isEditMode, setIsEditMode] = useState(false);

    const errorRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        setErrorMessage("");
    }, [permissionsState]);

    const UpdatePermissions = async (employee) => {
        try {
            const updatedEmployee = {
                ...employee,
                permissions: permissionsState,
            };
            console.log(updatedEmployee);
            const response = await axiosInstance.put(
                `employees/${employee.employee_id}/update`,
                updatedEmployee,
            );
            return response.data;
        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage(
                    "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
                );
            }
        }
    };

    // Gestionnaire d'événements pour la mise à jour des permissions
    const handleUpdatePermissions = async () => {
        const newEmployee = await UpdatePermissions(selectedEmployee);
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
                Autorisation de {selectedEmployee.first_name}{" "}
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
        </Box>
    );
};

export default PermissionsDisplay;
