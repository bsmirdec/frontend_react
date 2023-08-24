import React from "react";
import useDeleteManagementMutation from "../../employees/hooks/useDeleteManagementMutation";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

const ConfirmDeleteEmployeeModal = ({
    open,
    employeesToDelete,
    worksite,
    onClose,
    onCancel,
}) => {
    const deleteManagement = useDeleteManagementMutation();

    const handleDeleteConfirmation = async (event) => {
        event.preventDefault();
        for (const employee of employeesToDelete) {
            try {
                await deleteManagement.mutateAsync({
                    worksiteId: worksite.worksite_id,
                    employeeId: employee,
                });
                console.log("Affectation supprimée");
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
            }
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmation de la suppression</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Êtes-vous sûr de vouloir supprimer les affectations
                    sélectionnées ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Annuler
                </Button>
                <Button onClick={handleDeleteConfirmation} color="primary">
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteEmployeeModal;
