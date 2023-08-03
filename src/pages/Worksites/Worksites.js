import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api/axios";
import Worksite from "../../features/worksites/components/Worksite";
import WorksiteLoadingComponent from "../../features/worksites/components/WorksiteLoading";
import WorksitesDrawer from "../../features/worksites/components/WorksitesDrawer";
import NewWorksite from "../../features/worksites/components/NewWorksite";

function Worksites() {
    const WorksiteLoading = WorksiteLoadingComponent(WorksitesDrawer);
    const [worksiteState, setWorksiteState] = useState({
        loading: true,
        worksites: null,
    });
    const [activeWorksite, setActiveWorksite] = useState(null);
    const [displayNewWorksite, setDisplayNewWorksite] = useState(false);
    const toggleDisplayNewWorksite = () => {
        setDisplayNewWorksite(!displayNewWorksite);
    };

    useEffect(() => {
        axiosInstance
            .get("/worksites/")
            .then((response) => {
                const worksites = response.data;
                setWorksiteState({ loading: false, worksites: worksites });

                // Vérifier si l'utilisateur a un seul chantier
                if (worksites && worksites.length === 1) {
                    setActiveWorksite(worksites[0]); // Définir le seul chantier comme actif
                }
            })
            .catch((error) => {
                console.error(
                    "Une erreur s'est produite lors de la récupération des chantiers :",
                    error,
                );
                setWorksiteState({ loading: false, worksites: [] });
            });
    }, []);

    return (
        <div style={{ display: "flex" }}>
            {worksiteState.loading ? (
                <WorksiteLoading isLoading={worksiteState.loading} />
            ) : (
                <React.Fragment>
                    {worksiteState.worksites &&
                        worksiteState.worksites.length > 1 && (
                            <WorksitesDrawer
                                style={{ height: "100%" }}
                                onCreateNewWorksite={toggleDisplayNewWorksite}
                                worksites={worksiteState.worksites}
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
                                <p style={{ margin: "auto", fontSize: "2em" }}>
                                    Sélectionnez un chantier
                                </p>
                            )}
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}

export default Worksites;
