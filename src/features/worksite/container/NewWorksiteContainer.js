import { useEffect, useState } from "react";
import React from "react";
import CreateWorksiteForm from "../components/CreateWorksiteForm";
import AffectTeamWorksite from "../components/AffectTeamWorsite";
import MaxStockForm from "../../stock/components/MaxStockForm";
import { Box } from "@mui/material";

function NewWorksiteContainer() {
    const [page, setPage] = useState(0);
    const [worksite, setWorksite] = useState({});

    useEffect(() => {
        console.log(worksite);
    }, [worksite]);

    return (
        <Box style={{ overflow: "auto" }}>
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
            {page === 2 && (
                <MaxStockForm
                    page={page}
                    setPage={setPage}
                    worksite={worksite}
                />
            )}
            ;
        </Box>
    );
}

export default NewWorksiteContainer;
