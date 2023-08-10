import React, { useEffect, useState } from "react";
import axiosInstance from "../../../services/api/axios";
import Worksite from "../../features/worksites/components/Worksite";
import WorksitesDrawer from "../../features/worksites/components/WorksitesDrawer";
import NewWorksite from "../../features/worksites/components/NewWorksite";
import useApiRequest from "../../../services/api/useApiRequest";
import ApiErrorLoadingWrapper from "../../../services/api/ApiErrorLoadingWrapper";
import { Typography } from "@mui/material";

function Worksites() {
    const [worksiteState, setWorksiteState] = useState(null);
    const [activeWorksite, setActiveWorksite] = useState(null);
    const [displayNewWorksite, setDisplayNewWorksite] = useState(false);
    const toggleDisplayNewWorksite = () => {
        setDisplayNewWorksite(!displayNewWorksite);
    };

    const {
        data: worksitesData,
        loading,
        error,
    } = useApiRequest(() => axiosInstance.get("/worksites/"));

    useEffect(() => {
        if (worksitesData) {
            setWorksiteState(worksitesData);
            if (worksitesData.length === 1) {
                // Vérifier si l'utilisateur a un seul chantier
                setActiveWorksite(worksitesData[0]); // Définir le seul chantier comme actif
            }
        }
    }, [worksitesData]);

    return (
        <ApiErrorLoadingWrapper error={error} loading={loading}>
            <div style={{ display: "flex" }}>
                {worksiteState && worksiteState.length > 1 && (
                    <WorksitesDrawer
                        style={{ height: "100%" }}
                        onCreateNewWorksite={toggleDisplayNewWorksite}
                        worksites={worksiteState}
                        setActiveWorksite={setActiveWorksite}
                    />
                )}
                {displayNewWorksite ? (
                    <NewWorksite onCancel={toggleDisplayNewWorksite} />
                ) : (
                    <React.Fragment>
                        {activeWorksite ? (
                            <Worksite worksite={activeWorksite} />
                        ) : (
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{ margin: "auto", fontSize: "2em" }}
                            >
                                Sélectionnez un chantier
                            </Typography>
                        )}
                    </React.Fragment>
                )}
            </div>
        </ApiErrorLoadingWrapper>
    );
}

export default Worksites;
