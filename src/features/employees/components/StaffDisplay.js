import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../services/api/axios";
import { Typography, Card, CardContent, Button, Modal } from "@mui/material";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import PermissionsDisplay from "./PermissionsDisplay";
import useAuth from "../../auth/hooks/useAuth";

const StaffDisplay = () => {
    const { auth } = useAuth();
    const [staff, setStaff] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const errorRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("");
    }, [staff, setStaff]);

    useEffect(() => {
        setErrorMessage("");
        console.log(auth);
        const fetchStaff = async () => {
            try {
                const response = await axiosInstance.get(
                    `users/${auth.userId}/staff`,
                );
                setStaff(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de l'équipe :",
                    error,
                );
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                ) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage(
                        "Une erreur s'est produite lors de la récupération de l'équipe. Veuillez réessayer.",
                    );
                }
            }
        };

        fetchStaff();
    }, [auth, auth.userId]);

    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
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
        setIsModalOpen(false);
    };

    return (
        <div>
            <ErrorMessage ref={errorRef} message={errorMessage} />
            <Typography variant="h4">Équipe de {auth.firstName}</Typography>
            {staff.map((employee) => (
                <Card key={employee.employee_id}>
                    <CardContent>
                        <Typography>Nom : {employee.first_name}</Typography>
                        <Typography>Prénom : {employee.last_name}</Typography>
                        <Typography>Poste : {employee.position}</Typography>
                        {/* Afficher les chantiers sur lesquels ils sont affectés */}
                        <Button variant="contained" color="primary">
                            Changer affectation
                        </Button>
                        {/* Bouton "autorisations" avec le lien vers DisplayPermissions */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(employee)}
                        >
                            Autorisations
                        </Button>
                    </CardContent>
                </Card>
            ))}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <div>
                    <PermissionsDisplay
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        onClose={handleCloseModal}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default StaffDisplay;
