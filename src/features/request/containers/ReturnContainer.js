import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const ReturnContainer = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            <Typography>Retour</Typography>
        </Box>
    );
};

export default ReturnContainer;
