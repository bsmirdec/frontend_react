import React, { useState, useEffect } from "react";
import useWorksitesForEmployeeQuery from "../hooks/useWorksitesForEmployee";
import AddWorksitesModal from "./AddWorksiteModal";
import ConfirmDeleteWorksiteModal from "./ConfirmDeleteWorksiteModal";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import Loading from "../../../components/layout/Loading";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton,
    List,
    ListItem,
    Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AffectationsDisplay = ({ selectedEmployee, onClose }) => {
    const {
        data: worksites,
        isLoading,
        isError,
    } = useWorksitesForEmployeeQuery(selectedEmployee.employee_id);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [worksitesToDelete, setWorksitesToDelete] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const toggleWorksiteToDelete = (worksiteId) => {
        if (worksitesToDelete.includes(worksiteId)) {
            setWorksitesToDelete(
                worksitesToDelete.filter((id) => id !== worksiteId),
            );
        } else {
            setWorksitesToDelete([...worksitesToDelete, worksiteId]);
        }
    };

    const handleAdd = () => {
        setIsAddMode(true);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

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
                Affectations de {selectedEmployee.first_name}{" "}
                {selectedEmployee.last_name}
            </Typography>
            <Box>
                {worksites.map((worksite) => (
                    <div key={worksite.worksite_id}>
                        {!isEditMode ? (
                            <List>
                                <ListItem>{worksite.name}</ListItem>
                            </List>
                        ) : (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={worksitesToDelete.includes(
                                            worksite.worksite_id,
                                        )}
                                        disabled={!isEditMode}
                                        onChange={() =>
                                            toggleWorksiteToDelete(
                                                worksite.worksite_id,
                                            )
                                        }
                                    />
                                }
                                label={worksite.name}
                            />
                        )}
                    </div>
                ))}
            </Box>
            {isEditMode ? (
                <Box>
                    {isAddMode ? (
                        <AddWorksitesModal
                            open={isAddMode}
                            onClose={() => setIsAddMode(false)}
                            selectedEmployee={selectedEmployee}
                            onConfirm={() => {
                                setIsAddMode(false);
                            }}
                        />
                    ) : (
                        <Button
                            style={{ marginRight: "10px" }}
                            variant="contained"
                            color="primary"
                            onClick={handleAdd}
                        >
                            Ajouter
                        </Button>
                    )}
                    {worksitesToDelete.length > 0 && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowConfirmationModal(true)}
                        >
                            Supprimer
                        </Button>
                    )}
                </Box>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditMode(true)}
                >
                    Mettre à jour
                </Button>
            )}
            {/* Confirmation Modal */}
            <Modal
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
            >
                <ConfirmDeleteWorksiteModal
                    worksitesToDelete={worksitesToDelete}
                    selectedEmployee={selectedEmployee}
                    onCancel={() => setShowConfirmationModal(false)}
                    open={showConfirmationModal}
                    onClose={() => setShowConfirmationModal(false)}
                />
            </Modal>
        </Box>
    );
};

export default AffectationsDisplay;
