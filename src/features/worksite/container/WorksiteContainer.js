// features/worksites/components/Worksite.js
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import useWorksiteQuery from "../hooks/useWorksiteQuery";
import WorksiteEmployees from "../components/WorksiteEmployees";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";

function WorksiteContainer({ activeWorksite }) {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);

    const {
        data: worksiteData,
        isError,
        isLoading,
    } = useWorksiteQuery(activeWorksite);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    if (!activeWorksite) {
        return <p>Aucun chantier sélectionné</p>;
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

    return (
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
                        <Tab label="Stock" value={0} sx={{ color: "white" }} />
                        <Tab label="Bennes" value={1} sx={{ color: "white" }} />
                        <Tab
                            label="Personnel"
                            value={2}
                            sx={{ color: "white" }}
                        />
                        <Tab label="QSE" value={3} sx={{ color: "white" }} />
                    </Tabs>
                </Toolbar>
            </AppBar>
            {selectedTab === 2 && <WorksiteEmployees worksite={worksiteData} />}
        </Box>
    );
}

export default WorksiteContainer;
