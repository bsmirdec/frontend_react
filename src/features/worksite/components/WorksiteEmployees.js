import React from "react";
import useEmployeesForWorksiteQuery from "../hooks/useEmployeesForWorksiteQuery";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { List, Card, CardContent, Typography } from "@mui/material";

function WorksiteEmployees({ worksite }) {
    const worksiteId = worksite.worksite_id;
    const {
        data: employees,
        isLoading,
        isError,
    } = useEmployeesForWorksiteQuery(worksiteId);

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
                <Card key={employee.employee_id}>
                    <CardContent>
                        <Typography>Nom : {employee.first_name}</Typography>
                        <Typography>Prénom : {employee.last_name}</Typography>
                        <Typography>Poste : {employee.position}</Typography>
                    </CardContent>
                </Card>
            ))}
        </List>
    );
}

export default WorksiteEmployees;
