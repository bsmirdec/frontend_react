import { Box, Typography } from "@mui/material";

const BennesContainer = () => {
    return (
        <Box
            style={{
                margin: "auto",
                position: "relative",
            }}
            textAlign="center"
            my={3}
        >
            <Typography
                variant="body1"
                component="p"
                sx={{ margin: "auto", fontSize: "2em" }}
            >
                Fonctionnalité à venir:
            </Typography>
            <Typography
                variant="body1"
                component="p"
                sx={{ margin: "auto", fontSize: "2em" }}
            >
                - Suivi bennes CCP -
            </Typography>
        </Box>
    );
};

export default BennesContainer;
