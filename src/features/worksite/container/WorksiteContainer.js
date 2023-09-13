// features/worksites/components/Worksite.js
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import useWorksiteQuery from "../hooks/useWorksiteQuery";
import StockContainer from "../../stock/containers/StockContainer";
import BennesContainer from "../../newFeatures/BennesContainer";
import QSEContainer from "../../newFeatures/QSEContainer";
import WorksiteEmployees from "../components/WorksiteEmployees";
import UpdateWorksiteEmployees from "../components/UpdateWorksiteEmployees";
import WorksiteInfo from "../components/WorksiteInfo";
import UpdateWorksiteForm from "../components/UpdateWorksiteForm";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";

function WorksiteContainer({ activeWorksite }) {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);
    const [isEmployeesUpdateMode, setIsEmployeesUpdateMode] = useState(false);
    const [isWorksiteUpdateMode, setIsWorksiteUpdateMode] = useState(false);

    const { worksite, isWorksiteLoading, isWorksiteError, worksiteError } =
        useWorksiteQuery(activeWorksite);

    useEffect(() => {
        setSelectedTab(0);
        setIsEmployeesUpdateMode(false);
        setIsWorksiteUpdateMode(false);
    }, [activeWorksite]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    if (!activeWorksite) {
        return <p>Aucun chantier sélectionné</p>;
    }

    if (isWorksiteLoading) {
        return <Loading />;
    }

    if (isWorksiteError) {
        return <ErrorMessage message={worksiteError.message} />;
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
                        {worksite.city} - {worksite.name}
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
                        <Tab label="Infos" value={4} sx={{ color: "white" }} />
                    </Tabs>
                </Toolbar>
            </AppBar>
            {selectedTab === 0 && <StockContainer worksite={worksite} />}
            {selectedTab === 1 && <BennesContainer />}
            {selectedTab === 2 &&
                (isEmployeesUpdateMode ? (
                    <UpdateWorksiteEmployees
                        worksite={worksite}
                        setIsUpdateMode={setIsEmployeesUpdateMode}
                    />
                ) : (
                    <WorksiteEmployees
                        worksite={worksite}
                        setIsUpdateMode={setIsEmployeesUpdateMode}
                    />
                ))}
            {selectedTab === 3 && <QSEContainer />}
            {selectedTab === 4 &&
                (isWorksiteUpdateMode ? (
                    <UpdateWorksiteForm
                        worksite={worksite}
                        setIsUpdateMode={setIsWorksiteUpdateMode}
                    />
                ) : (
                    <WorksiteInfo
                        worksite={worksite}
                        setIsUpdateMode={setIsWorksiteUpdateMode}
                    />
                ))}
        </Box>
    );
}

export default WorksiteContainer;
