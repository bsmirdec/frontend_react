// features/worksites/components/WorksitesContainer.js
import React, { useState } from "react";
import WorksiteList from "../components/WorksiteList";
import WorksiteContainer from "./WorksiteContainer";
import CreateWorksiteForm from "../components/CreateWorksiteForm";
import useWorksiteListQuery from "../hooks/useWorksiteListQuery";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { Typography } from "@mui/material";

function WorksitesContainer() {
    const { data: worksitesData, isLoading, isError } = useWorksiteListQuery();
    const [activeWorksite, setActiveWorksite] = useState(null);
    const [displayNewWorksite, setDisplayNewWorksite] = useState(false);

    const toggleDisplayNewWorksite = () => {
        console.log("composant rendu");
        setDisplayNewWorksite(!displayNewWorksite);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

    return (
        <div style={{ display: "flex" }}>
            <WorksiteList
                worksites={worksitesData}
                setActiveWorksite={setActiveWorksite}
                onCreateNewWorksite={toggleDisplayNewWorksite}
            />
            <div>
                {displayNewWorksite ? (
                    <CreateWorksiteForm onCancel={toggleDisplayNewWorksite} />
                ) : (
                    <React.Fragment>
                        {activeWorksite ? (
                            <WorksiteContainer
                                activeWorksite={activeWorksite}
                            />
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
        </div>
    );
}

export default WorksitesContainer;
