// features/worksites/components/Worksite.js
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import WorksiteEmployees from "./WorksiteEmployees";
import useWorksiteQuery from "../hooks/useWorksiteQuery";

function WorksiteDetails({ worksite }) {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);

    const {
        data: worksiteData,
        isError,
        isLoading,
    } = useWorksiteQuery(worksite);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    if (!worksite) {
        return <p>Aucun chantier sélectionné</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {isError.message}</p>;
    }

    return (
        <div maxWidth="lg">
            <Box maxWidth="lg">
                <AppBar
                    position="static"
                    style={{ backgroundColor: theme.palette.secondary.light }}
                >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, color: "white" }}
                        >
                            {worksiteData.city} - {worksiteData.name}
                        </Typography>
                        <Tabs value={selectedTab} onChange={handleTabChange}>
                            <Tab
                                label="Stock"
                                value={0}
                                sx={{ color: "white" }}
                            />
                            <Tab
                                label="Bennes"
                                value={1}
                                sx={{ color: "white" }}
                            />
                            <Tab
                                label="Personnel"
                                value={2}
                                sx={{ color: "white" }}
                            />
                            <Tab
                                label="QSE"
                                value={3}
                                sx={{ color: "white" }}
                            />
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </Box>
            {selectedTab === 2 && <WorksiteEmployees />}
        </div>
    );
}

export default WorksiteDetails;
