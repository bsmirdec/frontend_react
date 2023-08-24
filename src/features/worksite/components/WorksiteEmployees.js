import React from "react";
import useEmployeesForWorksiteQuery from "../hooks/useEmployeesForWorksiteQuery";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import {
    List,
    ListItem,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import AllowedPermission from "../../permissions/components/AllowedPermission";
import { PERMISSIONS } from "../../permissions/PERMISSIONS";

function WorksiteEmployees({ worksite, setIsUpdateMode }) {
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
                <ListItem key={employee.employee_id}>
                    <Card key={employee.employee_id} style={{ width: "100%" }}>
                        <CardContent>
                            <Typography>Nom : {employee.first_name}</Typography>
                            <Typography>
                                Prénom : {employee.last_name}
                            </Typography>
                            <Typography>Poste : {employee.position}</Typography>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
            <AllowedPermission
                allowedPermissions={[
                    PERMISSIONS.management_create_object.code,
                    PERMISSIONS.management_delete_object.code,
                ]}
            >
                <ListItem
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        onClick={() => {
                            setIsUpdateMode(true);
                        }}
                        color="primary"
                    >
                        Modifier
                    </Button>
                </ListItem>
            </AllowedPermission>
        </List>
    );
}

export default WorksiteEmployees;
