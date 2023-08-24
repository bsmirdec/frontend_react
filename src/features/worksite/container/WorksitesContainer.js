// features/worksites/components/WorksitesContainer.js
import React, { useEffect, useState } from "react";
import { useBusiness } from "../../permissions/context/BusinessContext";
import WorksiteList from "../components/WorksiteList";
import WorksiteContainer from "./WorksiteContainer";
import useWorksiteListQuery from "../hooks/useWorksiteListQuery";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { Typography, Box } from "@mui/material";

function WorksitesContainer() {
    const { data: worksitesData, isLoading, isError } = useWorksiteListQuery();
    const { setBusinessData } = useBusiness();
    const [activeWorksite, setActiveWorksite] = useState(null);

    useEffect(() => {
        setBusinessData((prevData) => ({
            ...prevData,
            currentWorksite: activeWorksite,
        }));
    }, [activeWorksite, setBusinessData]);

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
            />
            <div>
                <React.Fragment>
                    {activeWorksite ? (
                        <WorksiteContainer activeWorksite={activeWorksite} />
                    ) : (
                        <Box
                            style={{
                                margin: "auto",
                                position: "relative",
                                top: "50%",
                                left: "100%",
                                transform: "translate(-50%, -50%)",
                            }}
                            textAlign="center"
                            my={3}
                        >
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{ margin: "auto", fontSize: "2em" }}
                            >
                                Sélectionnez un chantier
                            </Typography>
                        </Box>
                    )}
                </React.Fragment>
            </div>
        </div>
    );
}

export default WorksitesContainer;
