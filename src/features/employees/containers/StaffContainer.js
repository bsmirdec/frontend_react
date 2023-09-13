import React, { useState, useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useStaffListQuery from "../hooks/useStaffListQuery";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import AffectationsDisplay from "../components/AffectationsDisplay";
import PermissionsDisplay from "../components/PermissionsDisplay";
import ThresholdModal from "../components/ThresholdModal";
import {
    Typography,
    Card,
    CardContent,
    Button,
    Modal,
    Container,
} from "@mui/material";

const StaffContainer = () => {
    const { auth } = useAuth();
    const { staffData, isStaffError, isStaffLoading, staffError } =
        useStaffListQuery(auth.userId);
    const { businessData } = useBusiness();
    const [staff, setStaff] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
    const [isAffectationsModalOpen, setIsAffectationsModalOpen] =
        useState(false);
    const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);

    useEffect(() => {
        if (staffData) {
            setStaff(staffData);
        }
    }, [staffData]);

    if (isStaffLoading) {
        return <Loading />;
    }

    if (isStaffError) {
        return <ErrorMessage message={staffError.message} />;
    }

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

    // Fenêtre d'affichage/modification du seuil de validation : ThresholdSelect
    const handleOpenThresholdModal = (employee) => {
        setSelectedEmployee(employee);
        setIsThresholdModalOpen(true);
    };

    const handleCloseThresholdModal = () => {
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
        setIsThresholdModalOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4">
                Équipe de {businessData.firstName}
            </Typography>
            {staff.map((employee) => (
                <Card
                    key={employee.employee_id}
                    style={{ margin: "2px", maxWidth: "600px" }}
                >
                    <CardContent>
                        <Typography>Nom : {employee.first_name}</Typography>
                        <Typography>Prénom : {employee.last_name}</Typography>
                        <Typography>Poste : {employee.position}</Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() =>
                                handleOpenAffectationsModal(employee)
                            }
                        >
                            Affectations
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => handleOpenPermissionsModal(employee)}
                        >
                            Autorisations
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => handleOpenThresholdModal(employee)}
                        >
                            Seuil de validation
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
            <Modal
                open={isThresholdModalOpen}
                onClose={handleCloseThresholdModal}
            >
                <div>
                    <ThresholdModal
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        onClose={handleCloseThresholdModal}
                    />
                </div>
            </Modal>
        </Container>
    );
};

export default StaffContainer;
