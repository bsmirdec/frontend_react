import React, { useState } from "react";
import useAuth from "../../auth/hooks/useAuth";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useStaffListQuery from "../hooks/useStaffListQuery";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import AffectationsDisplay from "../components/AffectationsDisplay";
import PermissionsDisplay from "../components/PermissionsDisplay";
import {
    Typography,
    Card,
    CardContent,
    Button,
    Modal,
    AppBar,
    Toolbar,
} from "@mui/material";

const StaffContainer = () => {
    const { auth } = useAuth();
    // Récupération de l'équipe liée à l'utilisateur
    const {
        data: staffData,
        isLoading,
        isError,
    } = useStaffListQuery(auth.userId);
    const { businessData } = useBusiness();
    const [staff, setStaff] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
    const [isAffectationsModalOpen, setIsAffectationsModalOpen] =
        useState(false);

    React.useEffect(() => {
        if (staffData) {
            setStaff(staffData);
        }
    }, [staffData]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

    // Fenêtre d'affichage/modification des autorisations : PermissionsDisplay
    const handleOpenPermissionsModal = (employee) => {
        setSelectedEmployee(employee);
        setIsPermissionsModalOpen(true);
    };

    const handleClosePermissionsModal = () => {
        if (selectedEmployee) {
            const employeeIndex = staff.findIndex(
                (employee) =>
                    employee.employee_id === selectedEmployee.employee_id,
            );
            if (employeeIndex !== -1) {
                setStaff((prevStaff) => {
                    const updatedStaff = [...prevStaff];
                    updatedStaff[employeeIndex] = selectedEmployee;
                    return updatedStaff;
                });
            }
        }
        setSelectedEmployee(null);
        setIsPermissionsModalOpen(false);
    };

    // Fenêtre d'affichage/modification des affectations : AffectationsDisplay
    const handleOpenAffectationsModal = (employee) => {
        setSelectedEmployee(employee);
        setIsAffectationsModalOpen(true);
    };

    const handleCloseAffectationsModal = () => {
        setSelectedEmployee(null);
        setIsAffectationsModalOpen(false);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            <Typography variant="h4">
                Équipe de {businessData.firstName}
            </Typography>
            {staff.map((employee) => (
                <Card key={employee.employee_id}>
                    <CardContent>
                        <Typography>Nom : {employee.first_name}</Typography>
                        <Typography>Prénom : {employee.last_name}</Typography>
                        <Typography>Poste : {employee.position}</Typography>
                        {/* Afficher les chantiers sur lesquels ils sont affectés */}
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginRight: "5px" }}
                            onClick={() =>
                                handleOpenAffectationsModal(employee)
                            }
                        >
                            Affectations
                        </Button>
                        {/* Bouton "autorisations" avec le lien vers DisplayPermissions */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenPermissionsModal(employee)}
                        >
                            Autorisations
                        </Button>
                    </CardContent>
                </Card>
            ))}
            <Modal
                open={isPermissionsModalOpen}
                onClose={handleClosePermissionsModal}
            >
                <div>
                    <PermissionsDisplay
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        onClose={handleClosePermissionsModal}
                    />
                </div>
            </Modal>
            <Modal
                open={isAffectationsModalOpen}
                onClose={handleCloseAffectationsModal}
            >
                <div>
                    <AffectationsDisplay
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        onClose={handleCloseAffectationsModal}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default StaffContainer;
