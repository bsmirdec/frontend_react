import React, { useState } from "react";
import useWorksitesForEmployeeQuery from "../hooks/useWorksitesForEmployee";
import AddWorksiteModal from "./AddWorksiteModal";
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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const AffectationsDisplay = ({ selectedEmployee, onClose }) => {
    const { worksites, isWorksitesLoading, isWorksitesError, worksitesError } =
        useWorksitesForEmployeeQuery(selectedEmployee.employee_id);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [worksitesToDelete, setWorksitesToDelete] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    if (isWorksitesLoading) {
        return <Loading />;
    }

    if (isWorksitesError) {
        return <ErrorMessage message={worksitesError.message} />;
    }

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
                                <ListItem>
                                    {worksite.name} - {worksite.city}
                                </ListItem>
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
                                label={`${worksite.name} - ${worksite.city}`}
                            />
                        )}
                    </div>
                ))}
            </Box>
            {isEditMode ? (
                <Box>
                    {isAddMode ? (
                        <div>
                            <AddWorksiteModal
                                open={isAddMode}
                                onClose={() => setIsAddMode(false)}
                                selectedEmployee={selectedEmployee}
                            />
                        </div>
                    ) : (
                        <Button
                            style={{ marginRight: "10px" }}
                            startIcon={<AddIcon />}
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
                            startIcon={<DeleteIcon />}
                            color="secondary"
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
                <div>
                    <ConfirmDeleteWorksiteModal
                        worksitesToDelete={worksitesToDelete}
                        selectedEmployee={selectedEmployee}
                        onCancel={() => setShowConfirmationModal(false)}
                        open={showConfirmationModal}
                        onClose={() => setShowConfirmationModal(false)}
                    />
                </div>
            </Modal>
        </Box>
    );
};

export default AffectationsDisplay;
