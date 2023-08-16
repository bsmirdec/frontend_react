import { useEffect, useState } from "react";
import React from "react";
import CreateWorksiteForm from "../components/CreateWorksiteForm";
import AffectTeamWorksite from "../components/AffectTeamWorsite";

function NewWorksiteContainer() {
    const [page, setPage] = useState(0);
    const [worksite, setWorksite] = useState({});

    useEffect(() => {
        console.log(worksite);
    }, [worksite]);

    return (
        <div>
            {page === 0 && (
                <CreateWorksiteForm
                    page={page}
                    setPage={setPage}
                    worksite={worksite}
                    setWorksite={setWorksite}
                />
            )}
            {page === 1 && (
                <AffectTeamWorksite
                    page={page}
                    setPage={setPage}
                    worksite={worksite}
                />
            )}
            ;
        </div>
    );
}

export default NewWorksiteContainer;
