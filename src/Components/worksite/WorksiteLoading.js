import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';

function WorksiteLoading(Component) {
    return function WorksiteLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <Box sx={{ display: 'flex', margin: 'auto'}}>
                <CircularProgress />
            </Box>
        )
    }
}

export default WorksiteLoading;