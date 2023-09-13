import React from "react";
import { useBusiness } from "../../permissions/context/BusinessContext";
import useWorksitesForEmployeeQuery from "../../employees/hooks/useWorksitesForEmployee";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";

const WorksiteSelector = ({ selectedWorksite, setSelectedWorksite }) => {
    const { businessData } = useBusiness();
    const { worksites, isWorksitesLoading, isWorksitesError, worksitesError } =
        useWorksitesForEmployeeQuery(businessData.employeeId);

    if (isWorksitesLoading) {
        return <Loading />;
    }

    if (isWorksitesError) {
        return <ErrorMessage message={worksitesError.message} />;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6">Sélectionnez le chantier</Typography>
            <FormControl fullWidth>
                <Select
                    value={selectedWorksite}
                    onChange={(event) =>
                        setSelectedWorksite(event.target.value)
                    }
                >
                    {worksites.map((worksite) => (
                        <MenuItem key={worksite.worksite_id} value={worksite}>
                            {worksite.name}
                            {" - "}
                            {worksite.city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default WorksiteSelector;
