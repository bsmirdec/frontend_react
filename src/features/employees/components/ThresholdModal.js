import React, { useState } from "react";
import useUpdateEmployeeMutation from "../hooks/useUpdateEmployeeMutation";
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ThresholdModal = ({ selectedEmployee, setSelectedEmployee, onClose }) => {
    const [threshold, setThreshold] = useState(selectedEmployee.threshold);
    const updateEmployee = useUpdateEmployeeMutation();

    const thresholds = [
        { label: "pas de seuil", value: 0 },
        { label: "seuil courant", value: 1 },
        { label: "seuil important", value: 2 },
        { label: "seuil critique", value: 3 },
    ];

    // Gestionnaire d'événements pour la mise à jour des permissions
    const handleUpdateThreshold = async () => {
        const updatedEmployee = {
            ...selectedEmployee,
            threshold: threshold,
        };
        const newEmployee = await updateEmployee.mutateAsync(updatedEmployee);
        setSelectedEmployee((prevEmployee) => ({
            ...prevEmployee,
            threshold: newEmployee.threshold,
        }));
        setThreshold(newEmployee.threshold);
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
            <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <Typography variant="h6">
                Sélectionner un seuil de validation
            </Typography>
            <FormControl fullWidth>
                <Select
                    value={threshold}
                    onChange={(event) => setThreshold(event.target.value)}
                >
                    {thresholds.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="primary"
                onClick={onClose}
            >
                Retour
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateThreshold}
            >
                Confirmer
            </Button>
        </Box>
    );
};

export default ThresholdModal;
