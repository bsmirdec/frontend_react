import React from "react";
import { Typography, Paper, Box, Grid, Button, ListItem } from "@mui/material";

const subtitles = {
    name: "Nom",
    sector: "Secteur",
    client: "Client",
    city: "Ville",
    address: "Adresse",
    postal_code: "Code Postal",
    started: "Date de début",
    status: "Statut",
    // Ajouter d'autres clés ici si nécessaire
};

const WorksiteInfo = ({ worksite, setIsUpdateMode }) => {
    return (
        <Box>
            <Paper elevation={3} style={{ padding: "1rem" }}>
                <Typography variant="h6" gutterBottom>
                    Informations du Chantier
                </Typography>
                <Grid container spacing={2}>
                    {Object.keys(worksite).map(
                        (key) =>
                            // Exclure worksite_id et finished
                            key !== "worksite_id" &&
                            key !== "finished" && (
                                <Grid key={key} item xs={6}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ textDecoration: "underline" }}
                                    >
                                        {subtitles[key]}:
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {worksite[key]}
                                    </Typography>
                                </Grid>
                            ),
                    )}
                </Grid>
            </Paper>
            <ListItem
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    onClick={() => {
                        setIsUpdateMode(true);
                    }}
                    color="primary"
                >
                    Modifier
                </Button>
            </ListItem>
        </Box>
    );
};

export default WorksiteInfo;
