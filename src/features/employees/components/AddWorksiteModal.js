import React, { useState } from "react";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useWorksitesForEmployeeQuery from "../hooks/useWorksitesForEmployee";
import useCreateManagementMutation from "../hooks/useCreateManagementMutation";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import {
    Box,
    Modal,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Button,
} from "@mui/material";

const AddWorksiteModal = ({ selectedEmployee, open, onClose }) => {
    const { businessData } = useBusiness();
    const { worksites, isWorksitesLoading, isWorksitesError, worksitesError } =
        useWorksitesForEmployeeQuery(businessData.employeeId);
    const [selectedWorksite, setSelectedWorksite] = useState("");
    const createManagement = useCreateManagementMutation();

    const onCreateManagement = async (event) => {
        event.preventDefault();
        try {
            console.log(selectedWorksite);
            console.log(selectedEmployee);
            const response = await createManagement.mutateAsync({
                worksite_id: selectedWorksite,
                employee_id: selectedEmployee.employee_id,
            });
            console.log("Affectation au chantier:", response);
            onClose();
        } catch (error) {
            console.error("Erreur lors de l'affectation:", error);
        }
    };

    if (isWorksitesLoading) {
        return <Loading />;
    }

    if (isWorksitesError) {
        return <ErrorMessage message={worksitesError.message} />;
    }

    return (
        <Modal open={open} onClose={onClose}>
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
                <Typography variant="h6">
                    Sélectionnez un chantier à ajouter
                </Typography>
                <FormControl fullWidth>
                    <Select
                        value={selectedWorksite}
                        onChange={(event) =>
                            setSelectedWorksite(event.target.value)
                        }
                    >
                        {worksites.map((worksite) => (
                            <MenuItem
                                key={worksite.worksite_id}
                                value={worksite.worksite_id}
                            >
                                {worksite.name}
                                {" - "}
                                {worksite.city}
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
                    onClick={onCreateManagement}
                >
                    Confirmer
                </Button>
            </Box>
        </Modal>
    );
};

export default AddWorksiteModal;
