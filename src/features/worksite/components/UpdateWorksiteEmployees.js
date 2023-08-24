import React, { useState, useEffect } from "react";
import useEmployeesForWorksiteQuery from "../hooks/useEmployeesForWorksiteQuery";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import AllowedPermission from "../../permissions/components/AllowedPermission";
import { PERMISSIONS } from "../../permissions/PERMISSIONS";
import AddEmployeeModal from "../components/AddEmployeeModal";
import ConfirmDeleteEmployeeModal from "../components/ConfirmDeleteEmployeeModal";
import {
    List,
    ListItem,
    Card,
    CardContent,
    Typography,
    Button,
    Checkbox,
    Grid,
    Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function UpdateWorksiteEmployees({ worksite, setIsUpdateMode }) {
    const worksiteId = worksite.worksite_id;
    const {
        data: employees,
        isLoading,
        isError,
    } = useEmployeesForWorksiteQuery(worksiteId);

    const [employeesToDelete, setEmployeesToDelete] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const toggleEmployeeToDelete = (employeeId) => {
        setEmployeesToDelete((prevSelected) => {
            if (prevSelected.includes(employeeId)) {
                return prevSelected.filter((id) => id !== employeeId);
            } else {
                return [...prevSelected, employeeId];
            }
        });
    };

    const handleAdd = () => {
        setIsAddMode(true);
    };

    if (!employees) {
        return <p>Pas encore d'employés</p>;
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

    return (
        <List>
            {employees.map((employee) => (
                <ListItem key={employee.employee_id}>
                    <Card style={{ width: "100%" }}>
                        <CardContent>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                    <Checkbox
                                        checked={employeesToDelete.includes(
                                            employee.employee_id,
                                        )}
                                        onChange={() =>
                                            toggleEmployeeToDelete(
                                                employee.employee_id,
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Typography>
                                        Nom : {employee.first_name}
                                    </Typography>
                                    <Typography>
                                        Prénom : {employee.last_name}
                                    </Typography>
                                    <Typography>
                                        Poste : {employee.position}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
            <AllowedPermission
                allowedPermissions={[PERMISSIONS.worksite_update_object.code]}
            >
                {isAddMode ? (
                    <div>
                        <AddEmployeeModal
                            open={isAddMode}
                            onClose={() => setIsAddMode(false)}
                            worksite={worksite}
                            onConfirm={() => {
                                setIsAddMode(false);
                            }}
                        />
                    </div>
                ) : (
                    <ListItem>
                        <Button
                            startIcon={<AddIcon />}
                            variant="outlined"
                            color="primary"
                            onClick={handleAdd}
                        >
                            Ajouter
                        </Button>
                    </ListItem>
                )}
                {employeesToDelete.length > 0 && (
                    <ListItem>
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            color="secondary"
                            onClick={() => setShowConfirmationModal(true)}
                        >
                            Supprimer
                        </Button>
                    </ListItem>
                )}
                <ListItem
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        onClick={() => {
                            setIsUpdateMode(false);
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Confirmer
                    </Button>
                    {/* Confirmation Modal */}
                    <Modal
                        open={showConfirmationModal}
                        onClose={() => setShowConfirmationModal(false)}
                    >
                        <div>
                            <ConfirmDeleteEmployeeModal
                                employeesToDelete={employeesToDelete}
                                worksite={worksite}
                                onCancel={() => setShowConfirmationModal(false)}
                                open={showConfirmationModal}
                                onClose={() => setShowConfirmationModal(false)}
                            />
                        </div>
                    </Modal>
                </ListItem>
            </AllowedPermission>
        </List>
    );
}

export default UpdateWorksiteEmployees;
