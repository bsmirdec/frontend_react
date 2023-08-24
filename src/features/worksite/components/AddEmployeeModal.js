import React, { useState, useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";
import useStaffListQuery from "../../employees/hooks/useStaffListQuery";
import useCreateManagementMutation from "../../employees/hooks/useCreateManagementMutation";
import useCreateEmployeesNotification from "../../notifications/hooks/useCreateEmployeesNotification";
import useCreateWorksiteNotificationMutation from "../../notifications/hooks/useCreateWorksiteNotificationMutation";
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

const AddEmployeeModal = ({ worksite, open, onClose, onConfirm }) => {
    const { auth } = useAuth();
    const [error, setError] = useState("");
    const {
        data: staffList,
        isLoading,
        isError,
    } = useStaffListQuery(auth.userId);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const createManagement = useCreateManagementMutation();
    const createEmployeesNotification = useCreateEmployeesNotification();
    const createWorksiteNotification = useCreateWorksiteNotificationMutation();

    const onCreateManagement = async (event) => {
        event.preventDefault();
        try {
            const response = await createManagement.mutateAsync({
                worksite_id: worksite.worksite_id,
                employee_id: selectedEmployee,
            });
            await createWorksiteNotification.mutateAsync({
                content: `L'équipe du chantier ${worksite.name} - ${worksite.city} a été mise à jour.`,
                worksite_id: worksite.worksite_id,
            });
            const notif = await createEmployeesNotification.mutateAsync({
                content: `Vous faites désormais partie de l'équipe du chantier ${worksite.name} - ${worksite.city}. Rendez-vous sur l'onglet "Chantier"!`,
                employees: [selectedEmployee],
            });
            onClose();
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setError(error.response.data.detail);
            } else {
                setError("Une erreur s'est produite lors de l'affectation.");
            }
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
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
                    Sélectionnez un employé à ajouter au chantier
                </Typography>
                {error && <ErrorMessage message={error} />}
                <FormControl fullWidth>
                    <Select
                        value={selectedEmployee}
                        onChange={(event) =>
                            setSelectedEmployee(event.target.value)
                        }
                    >
                        {staffList.map((employee) => (
                            <MenuItem
                                key={employee.employee_id}
                                value={employee.employee_id}
                            >
                                {employee.first_name} {employee.last_name}
                                {" - "}
                                {employee.position}
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

export default AddEmployeeModal;
